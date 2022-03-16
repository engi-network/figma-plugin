import './styles/global.css'

import { useEffect, useState } from 'react'

import MainPage from '~/app/pages/Main/Main'
import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function App() {
  const [selectionUI, setSelectionUI] = useState()
  const [errorUI, setErrorUI] = useState()
  const [loading, setLoading] = useState(false)

  console.info('status', selectionUI, errorUI, loading)

  useEffect(() => {
    window.onmessage = (event) => {
      console.info('got this from the plugin code', event.data.pluginMessage)
      switch (event.data.pluginMessage.type) {
        case PLUGIN_CONSTATNS.FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI: {
          console.info('selection received in UI from Plugin')
          const selection = event.data.pluginMessage.data
          console.info(selection)
          setSelectionUI(selection)
          break
        }
        case PLUGIN_CONSTATNS.FIGMA_MSG_TYPE_SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI: {
          console.error(
            'error | from controller',
            event.data.pluginMessage.error,
          )
          setErrorUI(event.data.pluginMessage.error)
          break
        }
        case PLUGIN_CONSTATNS.FIGMA_MSG_TYPE_SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI: {
          setLoading(true)
          break
        }
        default:
          console.error('event type is not correct!')
      }
    }
  }, [])

  return <MainPage />
}

export default App
