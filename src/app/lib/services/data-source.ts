import { Message } from '@aws-sdk/client-sqs'

import AWSService from '~/app/lib/services/aws'
import PubSub from '~/app/lib/utils/pub-sub'
import { MessageData } from '~/app/models/Report'

const POLLING_INTERVAL = 10 * 1000

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

  start() {
    this.timerId = setInterval(async () => {
      try {
        const messages = await AWSService.receiveMessageFromSQS()
        console.log('raw messages frm sqs=====>', messages)
        if (!Array.isArray(messages)) {
          return
        }

        this.publishFromDS(messages)
      } catch (error) {
        console.error('error in sqs=>', error)
      }
    }, POLLING_INTERVAL)
  }

  stop() {
    clearInterval(this.timerId)
  }

  subscribeToDS(topic: string, callback): () => void {
    return this.subscribe(topic, callback)
  }

  unsubscribeFromDS() {}

  publishFromDS(messages) {
    messages.forEach(async (message: Message) => {
      const parsedMessage = await AWSService.processMsg(message)
      this.lastMessages.set(parsedMessage.check_id, parsedMessage)
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
