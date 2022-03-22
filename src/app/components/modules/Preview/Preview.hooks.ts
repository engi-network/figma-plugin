import { useCallback, useEffect, useState } from 'react'

import { decode } from '~/app/lib/utils/canvas'
import { PluginSelection } from '~/app/models/PluginSelection'
import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function usePreviewData() {
  const [errorUI, setErrorUI] = useState()
  const [isLoading, setLoading] = useState(false)
  const [selectionData, setSelectionData] = useState<PluginSelection>()

  const drawCallback = useCallback(
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!selectionData) {
        return
      }
      const { name, frame, repository } = selectionData
      const [component, story] = name.split('-')

      await decode(canvas, context as CanvasRenderingContext2D, frame)

      console.info('data after decode=====>', component, story, repository)
    },
    [selectionData],
  )

  useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      switch (event.data.pluginMessage.type) {
        case PLUGIN_CONSTATNS.FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI: {
          const { data } = event.data.pluginMessage
          setSelectionData(data)
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

  return {
    draw: drawCallback,
    selectionData,
    errorUI,
    isLoading,
  }
}

export default usePreviewData
