import { GetQueueUrlCommand, Message } from '@aws-sdk/client-sqs'
import { AWSError } from 'aws-sdk'

import config from '~/app/lib/config'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import SQSConsumer from '~/app/lib/services/sqs-consumer'
import PubSub from '~/app/lib/utils/pub-sub'
import {
  DetailedReport,
  ErrorResult,
  MessageData,
  ReportResult,
  STATUS,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

import delay from '../utils/delay'
import { dispatchData } from '../utils/event'
import { replaceItemInArray } from '../utils/object'
import { createStore } from '../utils/store'

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
      console.info(`getting SQS queue: ${name}`)
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

  async sqsCallback(data: MessageData) {
    const { history, lastMessages } = store.getState()
    const { check_id, step, step_count, error } = data as MessageData

    // duplicated message check if message is not removed in the queue by error
    console.log('store==>', store.getState())
    // if (check_id in lastMessages) {
    //   if (lastMessages[check_id].step >= step) {
    //     return
    //   }
    // }

    this.publishFromDS(data)

    const updateState = async (status: STATUS) => {
      const report =
        status === STATUS.SUCCESS
          ? await AWSService.fetchReportById(check_id, status)
          : undefined
      const baseReport = history.find((item) => item.checkId === check_id)

      const result =
        status === STATUS.FAIL
          ? ({
              ...baseReport?.result,
              error,
            } as ErrorResult)
          : ({
              ...baseReport?.result,
              ...report?.result,
            } as ReportResult)

      const detailedReport: DetailedReport = {
        checkId: check_id,
        originalImageUrl: baseReport?.originalImageUrl,
        result,
        status,
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
        updateState(STATUS.SUCCESS)
        return
      }
      if (error) {
        updateState(STATUS.FAIL)

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
      console.error(error)
    }
  }

  async createConsumer(checkId: string, baseReport: DetailedReport) {
    try {
      const queueUrl = await this.getSQSUrl(checkId, env, 0)

      if (!queueUrl) {
        return
      }

      const sqsConsumer = SQSConsumer.create({
        batchSize: 10,
        handleMessage: async (message) => {
          const parsedMessage = JSON.parse(message.Body || '')
          console.info(
            'recieved message for:::',
            JSON.parse(parsedMessage.Message),
          )
          this.sqsCallback(JSON.parse(parsedMessage.Message))
        },
        pollingWaitTimeMs: 10 * 1000,
        queueUrl,
        sqs: AWSService.sqsClient,
        waitTimeSeconds: 4,
      })

      store.setState((prev) => ({ history: [...prev.history, baseReport] }))
      sqsConsumer.start()
      this.consumerMap.set(checkId, sqsConsumer)
    } catch (error) {
      console.error('create consumser error', error as AWSError)
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

  unsubscribeFromDS() {}

  publishFromDS(message: MessageData) {
    const { check_id } = message
    store.setState((prev) => ({
      ...prev,
      lastMessages: {
        ...prev.lastMessages,
        [check_id]: { ...message },
      },
    }))
    console.log('publishing data', message)
    this.publish(check_id, message)
  }

  removeTopicFromDS(topic: string) {
    const item = this.lastMessages.get(topic)

    if (item) {
      this.lastMessages.delete(topic)
    }

    this.removeTopic(topic)
  }
}

export default new DataSource()
