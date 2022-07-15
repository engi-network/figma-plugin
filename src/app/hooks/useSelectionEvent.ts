import { useEffect, useState } from 'react'

import { PluginSelection } from '~/app/models/PluginSelection'
import * as PLUGIN_CONSTANTS from '~/plugin/constants'

function useSelectionEvent() {
  const [selectionData, setSelectionData] = useState<PluginSelection>()
  const [selectionError, setSelectionError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const selectionEventCallback = (event: MessageEvent) => {
    if (!event.data.pluginMessage) {
      return
    }

    switch (event.data.pluginMessage.type) {
      case PLUGIN_CONSTANTS.SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI: {
        const { data } = event.data.pluginMessage
        setSelectionData(data)
        break
      }
      case PLUGIN_CONSTANTS.SAME_STORY_SEND_ERROR_FROM_PLUGIN_TO_UI: {
        setSelectionError(event.data.pluginMessage.error)
        break
      }
      case PLUGIN_CONSTANTS.SAME_STORY_SEND_CLEAR_ERROR_FROM_PLUGIN_TO_UI: {
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
    selectionError,
    isLoading,
  }
}

export default useSelectionEvent
