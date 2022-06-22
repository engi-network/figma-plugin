import ReactDOM from 'react-dom'

import AWS from '~/app/lib/services/aws'
import GAService from '~/app/lib/services/ga'
import SentryReport from '~/app/lib/services/sentry'
import MyWorker from '~/app/lib/services/worker'
import { workerScript } from '~/app/scripts/worker'

import App from './App'
import { makeServer } from './mockServer/server'

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

SentryReport.init()
GAService.initialize()

ReactDOM.render(<App />, document.getElementById('root'))

AWS.initialize()
MyWorker.initialize(workerScript)
MyWorker.start()

if (module.hot) {
  module.hot.accept()
}
