import { Route, Routes } from 'react-router-dom'

import HistoryPage from '~/app/pages/History/History.container'
import LoadingPage from '~/app/pages/Loading/Loading'
import MainPage from '~/app/pages/Main/Main.container'
import ResultPage from '~/app/pages/Result/Result.container'

function RoutesPages() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/loading" element={<LoadingPage />} />
    </Routes>
  )
}

export default RoutesPages
