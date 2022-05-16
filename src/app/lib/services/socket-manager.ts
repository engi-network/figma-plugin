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

  createWs(id: string): CustomSocket {
    const wsHandler = new CustomSocket(config.SOCKET_URL)
    this.wsList?.push({
      id,
      wsHandler,
    })

    return wsHandler
  }

  terminateById(id: string): boolean {
    try {
      const item = this.wsList?.find((item) => item.id === id)
      item?.wsHandler.terminate(1, 'tell me why - reason')

      const filteredList = this.wsList?.filter((item) => item.id !== id)
      this.wsList = filteredList
      return true
    } catch (error) {
      console.error('error in termination of socket', error)
      return false
    }
  }

  getSocketById(id: string): WebSocketItem | undefined {
    const item = this.wsList?.find((item) => item.id === id)
    return item
  }
}

export default new SocketServiceManager()
