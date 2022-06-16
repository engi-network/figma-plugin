import config from '~/app/lib/config'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { SocketData } from '~/app/models/Report'

export enum READ_STATE {
  CLOSING = 2,
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 3,
}

export type CallbackType = (
  event: MessageEvent | Event,
  mySocket?: CustomSocket,
) => Promise<void>

export const SOCKET_HANGOUT_TIME = 5 * 1000 * 60 // 5 mins

export class CustomSocket {
  websocket: WebSocket | undefined
  isInitialized = false
  private callbacks: Record<string | 'onError' | 'onSuccess', CallbackType> = {}
  private subscriptions = new Map()
  lastData: SocketData | undefined
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

  subscribe(eventName, callback) {
    if (!this.subscriptions.has(eventName)) {
      this.sendMessage({
        message: 'subscribe',
        check_id: eventName,
      })
      this.subscriptions.set(eventName, new Set())
    }

    const newSub = { callback }
    this.subscriptions.get(eventName).add(newSub)

    return () => this.unsubscribe(eventName, newSub)
  }

  unsubscribe(eventName: string, newSub) {
    const evSub = this.subscriptions.get(eventName)
    evSub.delete(newSub)
    if (evSub.size === 0) {
      this.subscriptions.delete(eventName)
    }
  }

  publish(event: MessageEvent) {
    const data = JSON.parse(event.data)

    this.subscriptions.forEach((_, key, map) => {
      const callbacks = map.get(key)
      if (callbacks) {
        for (const c of callbacks) {
          c.callback(data)
        }
      }
    })
  }

  updateSubscription(eventName: string, callback) {
    const evSub = this.subscriptions.get(eventName)
    evSub.delete(callback)
    evSub.add(callback)
  }

  sendMessage(data: Record<string, string>) {
    this.websocket?.send(JSON.stringify(data))
  }

  receiveMessage(event: MessageEvent) {
    this.publish(event)
    this.lastData = JSON.parse(event.data)
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

export default new CustomSocket()
