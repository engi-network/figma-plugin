import * as ReactDOM from 'react-dom'

import App from './App'
import { makeServer } from './mockServer/server'

console.info('node env', process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' })
}

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
