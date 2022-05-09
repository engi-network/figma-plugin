import { MainContextProvider } from '~/app/contexts/Main.context'

import Main from './Main'

function MainContainer() {
  return (
    <MainContextProvider>
      <Main />
    </MainContextProvider>
  )
}

export default MainContainer
