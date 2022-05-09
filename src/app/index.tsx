import ReactDOM from 'react-dom'

import AWS from '~/app/lib/services/aws'
import SentryReport from '~/app/lib/services/sentry'

import App from './App'
import { makeServer } from './mockServer/server'

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

SentryReport.init()
AWS.initialize()

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
