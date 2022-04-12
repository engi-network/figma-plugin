import './styles/global.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { MemoryRouter as Router } from 'react-router-dom'

import Layout from '~/app/components/modules/App/Layout/Layout'
import { AppContextProvider } from '~/app/contexts/App.context'
import Routes from '~/app/pages/Routes'

import { ROUTES, ROUTES_MAP } from './lib/constants'

const queryClient = new QueryClient()

function App() {
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router
          initialEntries={[
            ROUTES_MAP[ROUTES.HOME],
            ROUTES_MAP[ROUTES.RESULT],
            ROUTES_MAP[ROUTES.HISTORY],
          ]}
          initialIndex={0}
        >
          <Layout>
            <Routes />
          </Layout>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AppContextProvider>
  )
}

export default App
