import { Route, Routes } from 'react-router-dom'

import MainPage from '~/app/pages/Main/Main'
import ResultPage from '~/app/pages/Result/Result'

function RoutesPages() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/result" element={<ResultPage />} />
    </Routes>
  )
}

export default RoutesPages
