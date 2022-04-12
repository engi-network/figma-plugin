import Canvas, { CanvasRefType } from '~/app/components/global/Canvas/Canvas'
import CanvasContainer from '~/app/components/global/Canvas/CanvasContainer'
import { FigmaIcon } from '~/app/components/global/Icons'
import ContainerWithTitle from '~/app/components/global/Layout/ContainerWithTitle/ContainerWithTitle'
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
    <ContainerWithTitle
      width={304}
      title={ui('main.preview.design')}
      description={label}
    >
      <div className="flex justify-end flex-1 items-center border border-wf-tertiery relative">
        <FigmaIcon
          className="absolute right-1 top-[-1]"
          width={41}
          height={41}
        />
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
    </ContainerWithTitle>
  )
}

export default Preview
