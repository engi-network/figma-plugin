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
      const data = await AWSService.receiveMessageFromSQS()
    }, POLLING_INTERVAL)
  }

  stop() {
    clearInterval(this.timerId)
  }
}

export default new DataSource()
