import { useCallback, useEffect, useState } from 'react'

import Canvas from '~/app/components/global/Canvas/Canvas'
import { decode } from '~/app/lib/utils/canvas'
import { PluginSelection } from '~/app/models/PluginSelection'
import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function Preview() {
  const [, setErrorUI] = useState()
  const [, setLoading] = useState(false)
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

  const { width = 0, height = 0 } = selectionData || {}

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold">Design</h2>
      <div className="designs--frame rounded flex-1">
        <Canvas
          id="designs--frame-canvas"
          className="border-double border-4 border-indigo-600"
          width={400}
          height={300}
          draw={drawCallback}
          options={{ contextId: '2d' }}
        />
        <span
          id="design-dimensions"
          className="prose font-light text-sm text-gray-400"
        >{`${width} * ${height}`}</span>
      </div>
    </div>
  )
}

export default Preview
