import Canvas, { CanvasRefType } from '~/app/components/global/Canvas/Canvas'
import CanvasContainer from '~/app/components/global/Canvas/CanvasContainer'
import { ui } from '~/app/lib/utils/ui-dictionary'

interface Props {
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => Promise<void>
  label: string
  originalCanvasRef?: CanvasRefType
}

function Preview({ draw, label, originalCanvasRef }: Props) {
  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl text-black mb-5 font-bold text-center">
        {ui('main.preview.design')}
      </h2>
      <div className="flex justify-end border border-wf-tertiery">
        <CanvasContainer
          id="designs--frame-canvas"
          width={280}
          height={229}
          draw={draw}
          options={{ contextId: '2d' }}
          label={label}
        >
          <Canvas
            id="designs--frame-canvas--original"
            options={{ contextId: '2d' }}
            draw={() => {}}
            ref={originalCanvasRef}
          />
        </CanvasContainer>
      </div>
    </div>
  )
}

export default Preview
