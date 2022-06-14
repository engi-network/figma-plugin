import Canvas, { CanvasRefType } from '~/app/components/global/Canvas/Canvas'
import CanvasContainer from '~/app/components/global/Canvas/CanvasContainer'
import { FigmaIcon } from '~/app/components/global/Icons'
import ContainerWithTitle from '~/app/components/global/Layout/ContainerWithTitle/ContainerWithTitle'
import { ui } from '~/app/lib/utils/ui-dictionary'

interface Props {
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => Promise<void>
  label?: string
  originalCanvasRef?: CanvasRefType
}

function Preview({ draw, originalCanvasRef, label }: Props) {
  return (
    <ContainerWithTitle
      width={304}
      title={ui('main.preview.design')}
      description={label}
      contentClassName={'flex justify-end items-center border'}
      icon={<FigmaIcon width={32} height={32} />}
    >
      <>
        <CanvasContainer
          id="designs--frame-canvas"
          width={'100%'}
          height={'100%'}
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
