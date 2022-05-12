export class CustomSocket {
  websocket: WebSocket | undefined
  isInitialized = false
  callback: (event: MessageEvent, mySocket: CustomSocket) => void = () => {}
  construct() {}

  initialize(sockerUrl: string) {
    this.websocket = new WebSocket(sockerUrl)

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

  subscribeToSocket(
    data: Record<string, string>,
    callback,
  ): CustomSocket | undefined {
    if (!this.websocket) {
      return
    }
    this.callback = callback
    console.info('send message to server=====>', data)
    this.websocket.send(JSON.stringify(data))
    return this
  }

  receiveMessage(event: MessageEvent) {
    this.callback(event, this)
  }

  handleSocketOpen() {
    console.info('socket has been open!')
  }

  handleError(error) {
    console.error('socket error!', error)
  }

  handleClose() {
    console.info('socket for polling closed')
  }

  terminate(code: number, reason: string) {
    this.websocket?.close(code, reason)
  }
}

export default new CustomSocket()
