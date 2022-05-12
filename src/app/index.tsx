import ReactDOM from 'react-dom'

import AWS from '~/app/lib/services/aws'
import SentryReport from '~/app/lib/services/sentry'
import MySocket from '~/app/lib/services/socket'
import MyWorker from '~/app/lib/services/worker'
import { workerScript } from '~/app/scripts/worker'

import App from './App'
import config from './lib/config'
import { makeServer } from './mockServer/server'

/**
 * @TODO handle error boundary for aws or sentry config fail
 */

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

SentryReport.init()

ReactDOM.render(<App />, document.getElementById('root'))

MyWorker.initialize(workerScript)
MyWorker.start()

AWS.initialize()
if (AWS.isInitialized) {
  AWS.receiveMessageFromSQS()
}

MySocket.initialize(config.SOCKET_URL)

if (module.hot) {
  module.hot.accept()
}
