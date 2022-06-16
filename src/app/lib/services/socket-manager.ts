// import config from '~/app/lib/config'
// import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'

// import { CallbackType, CustomSocket } from './socket'

// interface WebSocketItem {
//   id: string
//   wsHandler: CustomSocket
// }

// export class SocketServiceManager {
//   wsList: Array<WebSocketItem> | undefined
//   isInitialized = false

//   constructor() {}

//   initialize() {
//     this.wsList = []
//     this.isInitialized = true
//   }

//   createWs(
//     id: string,
//     callbacks: Record<'onSuccess' | 'onError' | string, CallbackType>,
//   ): CustomSocket {
//     const wsHandler = new CustomSocket(config.SOCKET_URL, callbacks)
//     this.wsList?.push({
//       id,
//       wsHandler,
//     })

//     return wsHandler
//   }

//   terminateById(id: string, code: number, reason: string): boolean {
//     try {
//       const item = this.wsList?.find((item) => item.id === id)
//       item?.wsHandler.terminate(code, reason)

//       const filteredList = this.wsList?.filter((item) => item.id !== id)
//       this.wsList = filteredList
//       return true
//     } catch (error) {
//       Sentry.sendReport({
//         error,
//         transactionName: SENTRY_TRANSACTION.SOCKET,
//         tagData: { socketId: id, code: code + '', reason },
//       })

//       return false
//     }
//   }

//   getSocketById(id: string): WebSocketItem | undefined {
//     const item = this.wsList?.find((item) => item.id === id)
//     return item
//   }
// }

// export default new SocketServiceManager()
