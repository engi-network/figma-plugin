import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FigmaIcon } from '~/app/components/global/Icons'
import { drawImage } from '~/app/lib/utils/canvas'

import Canvas from './Canvas'
import CanvasContainer from './CanvasContainer'

const IMAGE_URL =
  'https://same-story-api-staging.s3.us-west-2.amazonaws.com/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/frames/Button%20With%20Knobs.png'

export default {
  component: Canvas,
  title: 'Global/Components/Canvas',
} as ComponentMeta<typeof Canvas>

const CanvasTemplate: ComponentStory<typeof Canvas> = (args) => (
  <div className="bg-slate-400">
    <Canvas {...args} />
  </div>
)

const draw = (canvas: HTMLCanvasElement, context: RenderingContext) => {
  drawImage(canvas, context as CanvasRenderingContext2D, IMAGE_URL)
}

export const CanvasStory = CanvasTemplate.bind({})
CanvasStory.args = {
  children: 'Canvas',
  draw,
  height: 300,
  id: 'canvas-id',
  options: { contextId: '2d' },
  width: 300,
}

const CanvasContainerTemplate: ComponentStory<typeof CanvasContainer> = (
  args,
) => {
  return (
    <div className="h-[100vh] w-full bg-slate-800 p-10">
      <CanvasContainer {...args} />
    </div>
  )
}

export const CanvasContainerStory = CanvasContainerTemplate.bind({})
CanvasContainerStory.args = {
  children: 'Canvas Label',
  className: 'border border-red-100',
  draw,
  height: 300,
  icon: <FigmaIcon width={32} height={32} />,
  id: 'canvas-id',
  label: 'Canvas Label',
  options: { contextId: '2d' },
  width: 300,
}
