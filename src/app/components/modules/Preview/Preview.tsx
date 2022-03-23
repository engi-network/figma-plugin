import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import { ui } from '~/app/lib/utils/ui-dictionary'

interface Props {
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => Promise<void>
  label: string
}

function Preview({ draw, label }: Props) {
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
          label={label}
        />
      </div>
    </div>
  )
}

export default Preview
