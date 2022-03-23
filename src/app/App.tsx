import './styles/global.css'

import { MemoryRouter as Router } from 'react-router-dom'

import Layout from '~/app/components/modules/App/Layout/Layout'
import Routes from '~/app/pages/Routes'

function App() {
  return (
    <Router initialEntries={['/', '/result']} initialIndex={0}>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  )
}

export default App
