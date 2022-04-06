import { useEffect } from 'react'

import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function useHistoryEvent() {
  const historyEventCallback = (event: MessageEvent) => {
    if (!event.data.pluginMessage) {
      return
    }

    switch (event.data.pluginMessage.type) {
      case PLUGIN_CONSTATNS.SAME_STORY_HISTORY_LIST_PLUGIN_TO_UI: {
        const { data } = event.data.pluginMessage
        console.info('got event data=>', data)
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
}

export default useHistoryEvent
