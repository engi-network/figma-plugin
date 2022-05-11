import ReactDOM from 'react-dom'

import AWS from '~/app/lib/services/aws'
import SentryReport from '~/app/lib/services/sentry'
import MyWorker from '~/app/lib/services/worker'

import App from './App'
import { makeServer } from './mockServer/server'

/**
 * @TODO handle error boundary for aws or sentry config fail
 */

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

SentryReport.init()

if (AWS.isInitialized) {
  AWS.receiveMessageFromSQS()
}

MyWorker.initialize()
MyWorker.start()

ReactDOM.render(<App />, document.getElementById('root'))

AWS.initialize()

if (module.hot) {
  module.hot.accept()
}
