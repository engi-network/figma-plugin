import ReactDOM from 'react-dom'

import SentryReport from '~/app/lib/utils/sentry'

import App from './App'
import { makeServer } from './mockServer/server'

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

SentryReport.init()

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
