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
  isInitialized = false
  private callbacks: Record<string | 'onError' | 'onSuccess', CallbackType> = {}
  lastMessages = new Map<string, SocketData>()
  private timerId

  private connect() {
    this.websocket = new WebSocket(config.SOCKET_URL)
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

    this.isInitialized = true
  }

  subscribeToWs(topic, callback: CallbackType): () => void {
    this.sendMessage({
      message: 'subscribe',
      check_id: topic,
    })

    return this.subscribe(topic, callback)
  }

  unsubscribeFromWs(topic: string, callback: CallbackType) {
    this.unsubscribe(topic, callback)
  }

  publishFromWs(event: MessageEvent) {
    const data = JSON.parse(event.data) as SocketData

    const message = this.lastMessages.get(data.check_id)
    if (message) {
      this.lastMessages.set(data.check_id, data)
    }

    this.publish(data.check_id, data)
  }

  updateSubscriptionFromWs(topic: string, callback: CallbackType) {
    this.updateSubscription(topic, callback)
  }

  sendMessage(data: Record<string, string>) {
    this.websocket?.send(JSON.stringify(data))
  }

  receiveMessage(event: MessageEvent) {
    this.publishFromWs(event)
    clearTimeout(this.timerId)
  }

  handleSocketOpen(event: Event) {
    console.info('socket has been open!', event)
    this.callbacks.onSuccess && this.callbacks.onSuccess(event)

    this.timerId = setTimeout(() => {
      this.handleError(
        new Error('Socket is not sending data for a period of time!'),
      )
    }, SOCKET_HANGOUT_TIME)
  }

  handleError(error) {
    if (this.callbacks.onError) {
      this.callbacks.onError(error)
      this.terminate(1000, 'Socket server went wrong!')
      this.timerId && clearTimeout(this.timerId)
    }
    Sentry.sendReport({
      error,
      transactionName: SENTRY_TRANSACTION.SOCKET,
    })
  }

  handleClose() {
    let retry = 0

    const timerId = setInterval(() => {
      if (retry > 5) {
        clearInterval(timerId)
        this.handleError(new Error('Socket cannot open again!'))
      }

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
