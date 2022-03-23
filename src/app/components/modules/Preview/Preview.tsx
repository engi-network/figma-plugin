import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import { ui } from '~/app/lib/utils/ui-dictionary'

import usePreviewData from './Preview.hooks'

function Preview() {
  const { selectionData, draw } = usePreviewData()
  const { width = 0, height = 0 } = selectionData || {}

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg text-wf-secondary mb-5">
        {ui('main.preview.design')}
      </h2>
      <div className="flex justify-start">
        <Canvas
          id="designs--frame-canvas"
          width={280}
          height={210}
          draw={draw}
          options={{ contextId: '2d' }}
          label={`${width} ✕ ${height}`}
        />
      </div>
    </div>
  )
}

export default Preview
