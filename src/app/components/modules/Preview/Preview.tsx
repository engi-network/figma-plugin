import Canvas from '~/app/components/global/Canvas/Canvas'

import usePreviewData from './Preview.hooks'

function Preview() {
  const { selectionData, draw } = usePreviewData()
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
          draw={draw}
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
