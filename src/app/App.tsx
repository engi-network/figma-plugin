import './styles/global.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MemoryRouter as Router } from 'react-router-dom'

import Layout from '~/app/components/modules/App/Layout/Layout'
import Routes from '~/app/pages/Routes'

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router initialEntries={['/', '/result']} initialIndex={0}>
        <Layout>
          <Routes />
        </Layout>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
