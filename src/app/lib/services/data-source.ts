import { Message } from '@aws-sdk/client-sqs'

import config from '~/app/lib/config'
import AWSService from '~/app/lib/services/aws'
import SQSConsumer from '~/app/lib/services/sqs-consumer'
import PubSub from '~/app/lib/utils/pub-sub'
import { MessageData } from '~/app/models/Report'

import { createStore } from '../utils/store'

export const messageStore = createStore({
  history: [],
  lastMessages: [],
})

class DataSource extends PubSub {
  isInitialized = false
  timerId
  lastMessages = new Map<string, MessageData>()

  constructor() {
    super()
  }

  initialize() {
    if (!AWSService.isInitialized) {
      return
    }

    this.isInitialized = true
    this.start()
  }

  updateStore(messages: Array<Message>) {
    messages.forEach(() => {})
  }

  async start() {
    try {
      // messageStore.setState((prev) => ({
      //   ...prev,
      //   lastMessages: [...prev.lastMessages, Math.random()],
      // }))
      const sqsConsumer = SQSConsumer.create({
        handleMessage: async (message) => {
          const parsedMessage = JSON.parse(message.Body || '')
          console.log('received message===>', parsedMessage.Message)
        },
        pollingWaitTimeMs: 10 * 10000,
        queueUrl: config.SQS_URL,
        sqs: AWSService.sqsClient,
        waitTimeSeconds: 4,
      })
      sqsConsumer.start()

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

      messageStore.setState({ lastMessages: this.lastMessages })

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
