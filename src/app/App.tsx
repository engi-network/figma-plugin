import './styles/global.css'

import { useEffect } from 'react'

import MainPage from '~/app/pages/Main/Main'

function App() {
  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage
      if (type === 'create-rectangles') {
        console.info(`Figma Says: ${message}`)
      }
    }
  }, [])

  return <MainPage />
}

export default App
