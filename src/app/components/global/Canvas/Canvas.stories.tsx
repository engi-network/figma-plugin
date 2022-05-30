import { text } from '@storybook/addon-knobs'

import { FigmaIcon } from '~/app/components/global/Icons'
import { drawImage } from '~/app/lib/utils/canvas'

import Canvas from './Canvas'
import CanvasContainer from './CanvasContainer'

export default {
  component: Canvas,
  title: 'Global/Components/Canvas',
}

export function CanvasWithKnobs() {
  return (
    <div>
      <Canvas
        draw={() => {}}
        height={300}
        width={300}
        options={{ contextId: '2d' }}
        id={'canvas-id'}
      >
        {text('Label', 'Canvas Label')}
      </Canvas>
    </div>
  )
}

const IMAGE_URL =
  'https://same-story-api-staging.s3.us-west-2.amazonaws.com/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/frames/Button%20With%20Knobs.png'

export function CanvasContainerWithKnobs() {
  const draw = (canvas: HTMLCanvasElement, context: RenderingContext) => {
    drawImage(canvas, context as CanvasRenderingContext2D, IMAGE_URL)
  }

  return (
    <div className="h-[100vh] w-full bg-slate-800 p-10">
      <CanvasContainer
        draw={draw}
        height={300}
        width={300}
        options={{ contextId: '2d' }}
        id={'canvas-id'}
        label={text('Label', 'Canvas Label')}
        className="border border-red-100"
        icon={<FigmaIcon width={32} height={32} />}
      >
        {text('Label', 'Canvas Label')}
      </CanvasContainer>
    </div>
  )
}
