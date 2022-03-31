import { text } from '@storybook/addon-knobs'
import { useRef } from 'react'

import { decode } from '~/app/lib/utils/canvas'

import Preview from './Preview'

export default {
  component: Preview,
  title: 'Global/Modules/Preview',
}

export function PreviewWithDefault() {
  const originCanvasRef = useRef<HTMLCanvasElement>(null)
  const frameData = text('Frame', 'Frame string data')
  const draw = async (canvas: HTMLCanvasElement, context: RenderingContext) => {
    await decode(canvas, context as CanvasRenderingContext2D, frameData)
  }

  return (
    <div className="bg-primary-white">
      <Preview
        draw={draw}
        label={'100 ✕ 100'}
        originalCanvasRef={originCanvasRef}
      />
    </div>
  )
}
