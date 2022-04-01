import Canvas, { CanvasRefType } from '~/app/components/global/Canvas/Canvas'
import CanvasContainer from '~/app/components/global/Canvas/CanvasContainer'
import { ui } from '~/app/lib/utils/ui-dictionary'

interface Props {
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => Promise<void>
  height: number
  label?: string
  originalCanvasRef?: CanvasRefType
  width: number
}

function Preview({ draw, originalCanvasRef, height, width, label }: Props) {
  return (
    <div className="flex flex-col h-full w-[304px] relative">
      <h2 className="text-2xl text-black mb-5 font-bold text-center">
        {ui('main.preview.design')}
      </h2>
      <div className="flex justify-end flex-1 items-center border border-wf-tertiery">
        <CanvasContainer
          id="designs--frame-canvas"
          width={width}
          height={height}
          draw={draw}
          options={{ contextId: '2d' }}
        >
          <Canvas
            id="designs--frame-canvas--original"
            options={{ contextId: '2d' }}
            draw={() => {}}
            ref={originalCanvasRef}
          />
        </CanvasContainer>
      </div>
      {label && (
        <label className="text-base text-gray-400 text-center absolute -bottom-5 left-0 right-0">
          {label}
        </label>
      )}
    </div>
  )
}

export default Preview
