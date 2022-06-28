import { useEffect, useState } from 'react'

import { store } from '~/app/lib/services/data-source'
import { History } from '~/app/models/Report'
import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function useHistoryEvent() {
  const [history, setHistory] = useState<History>([])

  const historyEventCallback = (event: MessageEvent) => {
    if (!event.data.pluginMessage) {
      return
    }

    // initialize history to use in app once
    switch (event.data.pluginMessage.type) {
      case PLUGIN_CONSTATNS.SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI: {
        const { data } = event.data.pluginMessage
        store.setState((prev) => ({ ...prev, history: data }))
        break
      }

      default:
        break
    }
  }

  useEffect(() => {
    addEventListener('message', historyEventCallback)

    return () => {
      removeEventListener('message', historyEventCallback)
    }
  }, [])

  return {
    history,
    setHistory,
  }
}

export default useHistoryEvent
