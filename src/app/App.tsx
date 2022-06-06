import './styles/global.css'

import { MemoryRouter as Router } from 'react-router-dom'

import Layout from '~/app/components/modules/App/Layout/Layout'
import { AppContextProvider } from '~/app/contexts/App.context'
import { UserContextProvider } from '~/app/contexts/User.context'
import Routes from '~/app/pages/Routes'

import { MainContextProvider } from './contexts/Main.context'
import { ROUTES, ROUTES_MAP } from './lib/constants'

function App() {
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
              <Routes />
            </Layout>
          </MainContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </Router>
  )
}

export default App
