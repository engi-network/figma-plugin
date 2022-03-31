import { text } from '@storybook/addon-knobs'

import Canvas from './Canvas'

export default {
  component: Canvas,
  title: 'Global/Canvas',
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
