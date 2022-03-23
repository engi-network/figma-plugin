import * as ReactDOM from 'react-dom'

import App from './App'
import { makeServer } from './mockServer/server'

if (process.env.NODE_ENV === 'test') {
  makeServer({ environment: 'development' })
}

ReactDOM.render(<App />, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
