import config from '~/app/lib/config'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import PubSub from '~/app/lib/utils/pub-sub'
import { SocketData } from '~/app/models/Report'

export enum READ_STATE {
  CLOSING = 2,
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 3,
}

export type CallbackType = (
  event: SocketData | Event,
  mySocket?: SocketService,
) => Promise<void> | void

export const SOCKET_HANGOUT_TIME = 5 * 1000 * 60 // 5 mins

export class SocketService extends PubSub {
  websocket: WebSocket | undefined
  isConnected = false
  callbacks: Record<string | 'onError' | 'onSuccess', CallbackType> = {}
  lastMessages = new Map<string, SocketData>()

  connect() {
    this.websocket = new WebSocket(config.SOCKET_URL)
    this.isConnected = true
  }

  initialize() {
    this.connect()
    if (!this.websocket) {
      return
    }

    this.websocket.addEventListener(
      'open',
      this.handleSocketOpen.bind(this),
      undefined,
    )

    this.websocket.addEventListener(
      'error',
      this.handleError.bind(this),
      undefined,
    )

    this.websocket.addEventListener(
      'close',
      this.handleClose.bind(this),
      undefined,
    )

    this.websocket.addEventListener(
      'message',
      this.receiveMessage.bind(this),
      undefined,
    )
  }

  subscribeToWs(topic, callback: CallbackType): () => void {
    const topics = this.getTopics()
    if (!topics.includes(topic)) {
      this.sendMessage({
        message: 'subscribe',
        check_id: topic,
      })
    }

    return this.subscribe(topic, callback)
  }

  unsubscribeFromWs(topic: string, callback: CallbackType) {
    const item = this.lastMessages.get(topic)

    if (item) {
      this.lastMessages.delete(topic)
    }

    this.unsubscribe(topic, callback)
  }

  publishFromWs(event: MessageEvent) {
    const data = JSON.parse(event.data) as SocketData
    const lastMessage = this.lastMessages.get(data.check_id)

    // ignore delayed ones
    if (lastMessage) {
      if (data.step <= lastMessage.step) {
        return
      }
    }

    this.lastMessages.set(data.check_id, data)
    this.publish(data.check_id, data)
  }

  updateSubscriptionFromWs(topic: string, callback: CallbackType) {
    this.updateSubscription(topic, callback)
  }

  sendMessage(data: Record<string, string>) {
    if (this.isReady() === READ_STATE.OPEN) {
      this.websocket?.send(JSON.stringify(data))
    } else {
      console.info('Connection is not open to send message!')
    }
  }

  receiveMessage(event: MessageEvent) {
    this.publishFromWs(event)
  }

  // https://github.com/walkor/Workerman/issues/592#issuecomment-764190351
  private heartbeat() {
    const timerId = setInterval(() => {
      if (this.isReady() !== READ_STATE.OPEN) {
        clearInterval(timerId)
        return
      }

      this.sendMessage({ type: 'ping' })
    }, 55000)
  }

  handleSocketOpen(event: Event) {
    this.isConnected = true
    this.callbacks.onSuccess && this.callbacks.onSuccess(event)
  }

  handleError(error: Event) {
    if (this.callbacks.onError) {
      this.callbacks.onError(error)
    }

    this.terminate(1000, 'Socket server went wrong!')
    Sentry.sendReport({
      error,
      transactionName: SENTRY_TRANSACTION.SOCKET,
    })
  }

  handleClose(event: Event) {
    let retry = 0
    this.isConnected = false

    const timerId = setInterval(() => {
      if (retry > 5) {
        clearInterval(timerId)
        this.unsubscribeAll()
        this.handleError(event)
      }

      console.info('Socket is trying to reconnect!')
      retry += 1
      this.connect()
    }, 1000)
  }

  //code should be either 1000, or between 3000 and 4999
  private terminate(code: number, reason: string) {
    this.websocket?.close(code, reason)
  }

  isReady(): READ_STATE {
    if (!this.websocket) {
      return 3
    }

    return this.websocket.readyState
  }
}

export default new SocketService()
