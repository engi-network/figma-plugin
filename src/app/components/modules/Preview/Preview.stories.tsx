import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useRef } from 'react'

import { drawImage } from '~/app/lib/utils/canvas'
import { DEMENSIONS } from '~/app/pages/Main/Main.container.data'

import Preview from './Preview'

export default {
  component: Preview,
  title: 'Global/Modules/Preview',
} as ComponentMeta<typeof Preview>

const Template: ComponentStory<typeof Preview> = (args) => {
  const originCanvasRef = useRef<HTMLCanvasElement>(null)

  return (
    <div className="bg-primary-white">
      <Preview
        {...args}
        originalCanvasRef={originCanvasRef}
        {...DEMENSIONS.SMALL}
      />
    </div>
  )
}

export const PreviewStory = Template.bind({})
PreviewStory.args = {
  draw: async (canvas: HTMLCanvasElement, context: RenderingContext) => {
    await drawImage(canvas, context as CanvasRenderingContext2D, 'Frame string')
  },
}
