import { GetQueueUrlCommand, Message } from '@aws-sdk/client-sqs'

import config from '~/app/lib/config'
import AWSService from '~/app/lib/services/aws'
import SQSConsumer from '~/app/lib/services/sqs-consumer'
import PubSub from '~/app/lib/utils/pub-sub'
import {
  DetailedReport,
  ErrorResult,
  MessageData,
  ReportResult,
  STATUS,
} from '~/app/models/Report'

import { replaceItemInArray } from '../utils/object'
import { createStore } from '../utils/store'

export const store = createStore({
  history: [],
  lastMessages: [],
})

const env = config.isDev ? 'dev' : 'staging'

class DataSource extends PubSub {
  isInitialized = false
  timerId
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

  updateStore(messages: Array<Message>) {
    messages.forEach(() => {})
  }

  async getSQSUrl(checkId: string, env: string): Promise<string> {
    const name = `same-story-api-staging-${checkId}-status.fifo`
    console.info(`getting SQS queue: ${name}`)
    const data = await AWSService.sqsClient.send(
      new GetQueueUrlCommand({ QueueName: name }),
    )

    return data['QueueUrl'] || ''
  }

  async sqsCallback(data: MessageData) {
    const history = store.getState().history
    const { check_id, step, step_count, error } = data as MessageData

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

      // dispatchData({
      //   type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
      //   data: detailedReport,
      // })
      store.setState((prev) => ({
        ...prev,
        history: replacedArray,
      }))
    }

    try {
      // for the last step, successful case
      if (step === step_count - 1) {
        updateState(STATUS.SUCCESS)
        return
      }
      // error
      if (error) {
        updateState(STATUS.FAIL)

        // Sentry.sendReport({
        //   error,
        //   transactionName: SENTRY_TRANSACTION.GET_REPORT,
        //   tagData: { check_id },
        // })

        return
      }
      //in progress
    } catch (error) {
      // Sentry.sendReport({
      //   error,
      //   transactionName: SENTRY_TRANSACTION.GET_REPORT,
      //   tagData: { check_id },
      // })
      console.error(error)
    }
  }

  async createConsumer(checkId: string) {
    // const sqsUrl = await this.getSQSUrl(checkId, env)
    // console.log('======>sqs url', sqsUrl)

    const sqsConsumer = SQSConsumer.create({
      handleMessage: async (message) => {
        const parsedMessage = JSON.parse(message.Body || '')
        console.info('received message===>', parsedMessage.Message)
        this.sqsCallback(parsedMessage.Message)
      },
      pollingWaitTimeMs: 10 * 10000,
      queueUrl: config.SQS_URL,
      sqs: AWSService.sqsClient,
      waitTimeSeconds: 5,
    })

    sqsConsumer.start()
    this.consumerMap.set(checkId, sqsConsumer)
  }

  async start() {
    try {
      // messageStore.setState((prev) => ({
      //   ...prev,
      //   lastMessages: [...prev.lastMessages, Math.random()],
      // }))
      // publish messages for each topic for loading and history screen
      // this.publishFromDS(messages)
    } catch (error) {
      console.error('error in sqs=>', error)
    }
  }

  stop() {}

  subscribeToDS(topic: string, callback): () => void {
    return this.subscribe(topic, callback)
  }

  unsubscribeFromDS() {}

  publishFromDS(messages) {
    messages.forEach(async (message: Message) => {
      const parsedMessage = await AWSService.processMsg(message)
      this.lastMessages.set(parsedMessage.check_id, parsedMessage)

      store.setState({ lastMessages: this.lastMessages })

      this.publish(parsedMessage.check_id, parsedMessage)
    })
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
