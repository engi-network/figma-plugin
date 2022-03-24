import { Route, Routes } from 'react-router-dom'

import MainPage from '~/app/pages/Main/Main.container'
import ResultPage from '~/app/pages/Result/Result.container'

function RoutesPages() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  )
}

export default RoutesPages
