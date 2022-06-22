import { Message } from '@aws-sdk/client-sqs'

import AWSService from '~/app/lib/services/aws'
import PubSub from '~/app/lib/utils/pub-sub'

const POLLING_INTERVAL = 10 * 1000

class DataSource extends PubSub {
  isInitialized = false
  timerId
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

  subscribeToDS(topic: string, callback: () => void) {}

  unsubscribeFromDS() {}

  publishFromDS(data) {
    data.map(async (message: Message) => {
      const parsedMessage = await AWSService.processMsg(message)
      this.publish(parsedMessage.check_id, parsedMessage)
    })
  }
}

export default new DataSource()
