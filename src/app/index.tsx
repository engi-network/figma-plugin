import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'
import ReactDOM from 'react-dom'

import App from './App'
import { makeServer } from './mockServer/server'

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

Sentry.init({
  dsn: 'https://2c982cb750c44bb1b326c180ef877375@o1170825.ingest.sentry.io/6377960',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
  environment:
    process.env.NODE_ENV === 'development' ? 'development' : 'production',
})

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
