import { text } from '@storybook/addon-knobs'

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
        options={{ contextdId: '2d' }}
        id={'canvas-id'}
      >
        {text('Label', 'Canvas Label')}
      </Canvas>
    </div>
  )
}

export function CanvasContainerWithKnobs() {
  return (
    <div>
      <CanvasContainer
        draw={() => {}}
        height={300}
        width={300}
        options={{ contextdId: '2d' }}
        id={'canvas-id'}
        label={text('Label', 'Canvas Label')}
      >
        {text('Label', 'Canvas Label')}
      </CanvasContainer>
    </div>
  )
}
