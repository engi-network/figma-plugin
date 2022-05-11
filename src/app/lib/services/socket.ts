class MySocket {
  websocket: WebSocket | undefined
  isInitialized = false
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

    console.info('socket succcessfully connected to=====>', sockerUrl)
    this.isInitialized = true
  }

  sendMessage(data: Record<string, string>): void {
    if (!this.websocket) {
      return
    }

    this.websocket.send(JSON.stringify(data))
  }

  handleSocketOpen() {
    const data = {
      message: 'subscribe',
      topic: 'sports',
    }

    this.sendMessage(data)
  }

  receiveMessage(event: MessageEvent) {
    console.info('socket message received: ', event.data)
  }

  handleError(error) {
    console.error('socket error!', error)
  }
}

export default new MySocket()
