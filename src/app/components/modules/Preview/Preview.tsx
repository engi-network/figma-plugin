import { useCallback, useEffect, useRef, useState } from 'react'

import { decode } from '~/app/lib/utils/canvas'
import { PluginSelection } from '~/app/models/PluginSelection'
import * as PLUGIN_CONSTATNS from '~/plugin/constants'

function Preview() {
  const [, setErrorUI] = useState()
  const [, setLoading] = useState(false)
  const [[width, height], setDemension] = useState([0, 0])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const selectionCallback = useCallback(
    async ({ name, width, height, repository, frame }: PluginSelection) => {
      if (!canvasRef || !canvasRef.current) {
        return
      }

      const context = canvasRef.current.getContext('2d')

      if (!context) {
        return
      }

      const [component, story] = name.split('-')
      setDemension([width, height])

      await decode(canvasRef.current, context, frame)

      console.info('data after decode=====>', component, story, repository)
    },
    [],
  )

  useEffect(() => {
    window.onmessage = (event: MessageEvent) => {
      switch (event.data.pluginMessage.type) {
        case PLUGIN_CONSTATNS.FIGMA_MSG_TYPE_SAME_STORY_SEND_SELECTION_FROM_PLUGIN_TO_UI: {
          const { data } = event.data.pluginMessage
          selectionCallback(data)
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
  }, [selectionCallback])

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-3xl font-bold">Design</h2>
      <div className="designs--frame rounded flex-1">
        <canvas
          id="designs--frame-canvas"
          className="border-double border-4 border-indigo-600"
          ref={canvasRef}
          width={400}
          height={300}
        >
          <canvas id="designs--frame-canvas--original" />
        </canvas>
        <span
          id="design-dimensions"
          className="prose font-light text-sm text-gray-400"
        >{`${width} * ${height}`}</span>
      </div>
    </div>
  )
}

export default Preview
