import { Route, Routes } from 'react-router-dom'

import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import HistoryPage from '~/app/pages/History/History.container'
import LoadingPage from '~/app/pages/Loading/Loading'
import MainPage from '~/app/pages/Main/Main.container'
import ResultPage from '~/app/pages/Result/Result.container'

function RoutesPages() {
  return (
    <Routes>
      <Route path={ROUTES_MAP[ROUTES.HOME]} element={<MainPage />} />
      <Route path={ROUTES_MAP[ROUTES.RESULT]} element={<ResultPage />} />
      <Route path={ROUTES_MAP[ROUTES.HISTORY]} element={<HistoryPage />} />
      <Route path={ROUTES_MAP[ROUTES.LOADING]} element={<LoadingPage />} />
    </Routes>
  )
}

export default RoutesPages
