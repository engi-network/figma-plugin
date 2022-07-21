import { GetQueueUrlCommand } from '@aws-sdk/client-sqs'
import { AWSError } from 'aws-sdk'

import config from '~/app/lib/config'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import SQSConsumer from '~/app/lib/services/sqs-consumer/sqs-consumer'
import delay from '~/app/lib/utils/delay'
import { dispatchData } from '~/app/lib/utils/event'
import logger from '~/app/lib/utils/logger'
import { replaceItemInArray } from '~/app/lib/utils/object'
import PubSub from '~/app/lib/utils/pub-sub'
import { createStore } from '~/app/lib/utils/store'
import {
  FailedResult,
  MessageData,
  Report,
  REPORT_STATUS,
  ReportResult,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

export const store = createStore({
  history: [],
  lastMessages: {},
})

const env = config.isDev ? 'dev' : 'staging'

class DataSource extends PubSub {
  isInitialized = false
  lastMessages: Map<string, MessageData>
  consumerMap: Map<string, SQSConsumer>

  constructor() {
    super()
    this.consumerMap = new Map<string, SQSConsumer>()
    this.lastMessages = new Map<string, MessageData>()
  }

  initialize() {
    if (!AWSService.isInitialized) {
      return
    }

    this.isInitialized = true
  }

  async getSQSUrl(checkId: string, _: string, retry: number): Promise<string> {
    const connect = async (): Promise<string> => {
      const name = `same-story-api-staging-${checkId}-status.fifo`
      const data = await AWSService.sqsClient.send(
        new GetQueueUrlCommand({ QueueName: name }),
      )

      return data['QueueUrl'] || ''
    }

    return connect()
      .then((url) => url)
      .catch(async () => {
        if (retry > 1000) {
          return ''
        }

        retry++
        await delay(10)
        return this.getSQSUrl(checkId, _, retry)
      })
  }

  private async sqsCallback(data: MessageData) {
    const {
      check_id,
      step,
      step_count,
      error,
      results: messageResult,
    } = data as MessageData
    const { history } = store.getState()
    await delay(3)

    this.publishFromDS(data)

    logger.info('Received message for::', data)

    const updateState = async (status: REPORT_STATUS, report?: Report) => {
      const baseReport = history.find((item) => item.checkId === check_id)

      const result =
        status === REPORT_STATUS.FAIL
          ? ({
              ...baseReport?.result,
              error,
              ...messageResult,
              ...report?.result,
            } as FailedResult)
          : ({
              ...baseReport?.result, // for originalImageUrl that needs to be added to backend later
              ...messageResult,
              ...report?.result,
            } as ReportResult)

      const detailedReport: Report = {
        checkId: check_id,
        result,
        status: report ? report.status : REPORT_STATUS.FAIL,
      }

      const replacedArray = replaceItemInArray(
        history,
        'checkId',
        check_id,
        detailedReport,
      )

      this.stopConsumer(check_id)

      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })

      store.setState((prev) => ({
        ...prev,
        history: replacedArray,
      }))
    }

    try {
      if (step === step_count - 1) {
        const report = await AWSService.fetchReportById(check_id)
        await updateState(REPORT_STATUS.SUCCESS, report)
        return
      }

      if (error) {
        const report = await AWSService.fetchReportById(check_id)
        await updateState(REPORT_STATUS.FAIL, report)
        Sentry.sendReport({
          error,
          transactionName: SENTRY_TRANSACTION.GET_REPORT,
          tagData: { check_id },
        })
        return
      }
      //in progress
    } catch (error) {
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.GET_REPORT,
        tagData: { check_id },
      })
      logger.error('error occurred and stop consumer', error)
      await updateState(REPORT_STATUS.FAIL)
    }
  }

  async createConsumer(checkId: string, baseReport: Report) {
    try {
      const queueUrl = await this.getSQSUrl(checkId, env, 0)

      if (!queueUrl) {
        return
      }

      const sqsConsumer = SQSConsumer.create({
        batchSize: 10,
        handleMessage: async (message) => {
          const parsedMessage = JSON.parse(message.Body || '')
          await this.sqsCallback(JSON.parse(parsedMessage.Message))
        },
        pollingWaitTimeMs: 7 * 1000,
        queueUrl,
        sqs: AWSService.sqsClient,
        // visibilityTimeout: 5,
        waitTimeSeconds: 4,
      })

      store.setState((prev) => ({
        ...prev,
        history: [...prev.history, baseReport],
      }))

      sqsConsumer.start()
      this.consumerMap.set(checkId, sqsConsumer)
    } catch (error) {
      logger.error('create consumer error', error as AWSError)
    }
  }

  async stopConsumer(checkId: string) {
    const consumer = this.consumerMap.get(checkId)

    if (consumer) {
      consumer.stop()
      this.consumerMap.delete(checkId)
    }
  }

  subscribeToDS(topic: string, callback): () => void {
    return this.subscribe(topic, callback)
  }

  publishFromDS(message: MessageData) {
    const { check_id } = message
    store.setState((prev) => ({
      ...prev,
      lastMessages: {
        ...prev.lastMessages,
        [check_id]: { ...message },
      },
    }))
    this.publish(check_id, message)
  }
}

export default new DataSource()
