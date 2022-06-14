import './styles/global.css'

import { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { MemoryRouter as Router } from 'react-router-dom'

import GlobalErrorFallback from '~/app/components/global/GlobalErrorFallback/GlobalErrorFallback'
import Layout from '~/app/components/modules/App/Layout/Layout'
import { AppContextProvider } from '~/app/contexts/App.context'
import { UserContextProvider } from '~/app/contexts/User.context'
import Routes from '~/app/pages/Routes'

import { MainContextProvider } from './contexts/Main.context'
import { useWindowSize } from './hooks/useWindowSize'
import { ROUTES, ROUTES_MAP } from './lib/constants'

function App() {
  const { width, height } = useWindowSize()

  useEffect(() => {
    console.log(width, height)
  }, [width, height])

  return (
    <Router
      initialEntries={[
        ROUTES_MAP[ROUTES.HOME],
        ROUTES_MAP[ROUTES.RESULT],
        ROUTES_MAP[ROUTES.HISTORY],
        ROUTES_MAP[ROUTES.LOADING],
        ROUTES_MAP[ROUTES.ERROR],
      ]}
      initialIndex={0}
    >
      <AppContextProvider>
        <UserContextProvider>
          <MainContextProvider>
            <Layout>
              <ErrorBoundary FallbackComponent={GlobalErrorFallback}>
                <Routes />
              </ErrorBoundary>
            </Layout>
          </MainContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </Router>
  )
}

export default App
