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

export const SOCKET_HANGOUT_TIME = 1000 * 60

export class CustomSocket {
  websocket: WebSocket | undefined
  isInitialized = false
  private callbacks: Record<string | 'onError' | 'onSuccess', CallbackType> = {}
  private subscribers: Array<CallbackType> = []
  lastData: SocketData | undefined
  private timerId

  constructor(
    socketUrl: string,
    callbacks: Record<string | 'onError' | 'onSuccess', CallbackType>,
  ) {
    this.websocket = new WebSocket(socketUrl)
    this.callbacks = callbacks
    this.initialize()
  }

  private initialize() {
    if (!this.websocket) {
      this.isInitialized = false
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

  subscribe(callback): CustomSocket | undefined {
    this.subscribers.push(callback)
    return this
  }

  publish(event: MessageEvent) {
    this.subscribers.forEach((callback) => callback(event))
  }

  unsubscribe(callback) {
    const filteredCallbacks = this.subscribers.filter(
      (func) => func.name !== callback.name,
    )

    this.subscribers = filteredCallbacks
  }

  updateSubscribe(name, callback) {
    const foundIndex = this.subscribers.findIndex((fn) => fn.name === name)

    if (foundIndex >= 0) {
      this.subscribers[foundIndex] = callback
    }
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
      this.handleError(new Error('Socket is not sending data!'))
    }, SOCKET_HANGOUT_TIME)
  }

  handleError(error) {
    console.error('socket error!', error)
    if (this.callbacks.onError) {
      this.callbacks.onError(error)
      this.terminate(1000, 'Socket server went wrong!')
      this.timerId && clearTimeout(this.timerId)
    }
  }

  handleClose() {
    this.terminate(1000, 'Socket has been closed successfully!')
  }

  //code should be either 1000, or between 3000 and 4999
  terminate(code: number, reason: string) {
    this.websocket?.close(code, reason)
  }

  isReady(): READ_STATE {
    if (!this.websocket) {
      return 3
    }

    return this.websocket.readyState
  }
}
