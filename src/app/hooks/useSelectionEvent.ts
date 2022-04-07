import { useEffect, useState } from 'react'

import { PluginSelection } from '~/app/models/PluginSelection'
import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function useSelectionEvent() {
  const [selectionData, setSelectionData] = useState<PluginSelection>()
  const [errorUI, setErrorUI] = useState()
  const [isLoading, setLoading] = useState(false)

  const selectionEventCallback = (event: MessageEvent) => {
    if (!event.data.pluginMessage) {
      return
    }

    switch (event.data.pluginMessage.type) {
      case PLUGIN_CONSTATNS.SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI: {
        const { data } = event.data.pluginMessage
        setSelectionData(data)
        break
      }
      case PLUGIN_CONSTATNS.SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI: {
        console.error('error | from controller', event.data.pluginMessage.error)
        setErrorUI(event.data.pluginMessage.error)
        break
      }
      case PLUGIN_CONSTATNS.SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI: {
        setLoading(true)
        break
      }
      default:
        break
    }
  }

  useEffect(() => {
    addEventListener('message', selectionEventCallback)

    return () => {
      removeEventListener('message', selectionEventCallback)
    }
  }, [])

  return {
    selectionData,
    errorUI,
    isLoading,
  }
}

export default useSelectionEvent
