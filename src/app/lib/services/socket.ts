export enum READ_STATE {
  CLOSING = 2,
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 3,
}

type CallbackType = (event: MessageEvent, mySocket?: CustomSocket) => void
export class CustomSocket {
  websocket: WebSocket | undefined
  isInitialized = false
  subscribers: Array<CallbackType> = []
  lastMessage

  constructor(socketUrl: string) {
    this.websocket = new WebSocket(socketUrl)
  }

  initialize() {
    if (!this.websocket) {
      this.isInitialized = false
      return
    }

    this.websocket.addEventListener(
      'message',
      this.receiveMessage.bind(this),
      undefined,
    )

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

    this.isInitialized = true
  }

  subscribe(callback): CustomSocket | undefined {
    this.subscribers.push(callback)
    return this
  }

  publish(event: MessageEvent) {
    this.subscribers.forEach((callback) => callback(event))
  }

  unsubscribe() {
    this.subscribers = []
  }

  sendMessage(data: Record<string, string>) {
    this.websocket?.send(JSON.stringify(data))
  }

  receiveMessage(event: MessageEvent) {
    this.publish(event)
    this.lastMessage = JSON.parse(event.data)
  }

  handleSocketOpen() {
    console.info('socket has been open!')
  }

  handleError(error) {
    console.error('socket error!', error)
  }

  handleClose() {
    console.info('socket for polling closed')
    this.terminate(2, 'socket hang out')
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
