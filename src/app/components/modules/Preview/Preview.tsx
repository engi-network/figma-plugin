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
      contentClassName={'justify-end items-center border'}
      icon={<FigmaIcon width={41} height={41} />}
    >
      <>
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
      </>
    </ContainerWithTitle>
  )
}

export default Preview
