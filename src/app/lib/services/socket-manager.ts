import config from '~/app/lib/config'

import { CustomSocket } from './socket'

interface WebSocketItem {
  id: string
  wsHandler: CustomSocket
}

export class SocketServiceManager {
  wsList: Array<WebSocketItem> | undefined
  isInitialized = false

  constructor() {}

  initialize() {
    this.wsList = []
    this.isInitialized = true
  }

  createWs(id: string) {
    const wsHandler = new CustomSocket(config.SOCKET_URL)
    this.wsList?.push({
      id,
      wsHandler,
    })

    return wsHandler
  }

  terminateById(id: string) {
    const item = this.wsList?.find((item) => item.id === id)
    item?.wsHandler.terminate(1, 'tell me why - reason')

    const filteredList = this.wsList?.filter((item) => item.id !== id)
    this.wsList = filteredList
  }

  getSocketById(id: string) {
    const item = this.wsList?.find((item) => item.id === id)
    return item
  }
}

export default new SocketServiceManager()
