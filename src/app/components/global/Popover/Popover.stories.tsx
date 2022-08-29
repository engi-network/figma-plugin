import { ComponentMeta, ComponentStory } from '@storybook/react'

import Popover from './Popover'

export default {
  component: Popover,
  title: 'Global/Components/Popover',
} as ComponentMeta<typeof Popover>

const Template: ComponentStory<typeof Popover> = (args) => (
  <div className="h-64 bg-slate-700">
    <Popover {...args}>
      <>{args.children}</>
    </Popover>
  </div>
)

export const PopoverStory = Template.bind({})
PopoverStory.args = {
  children: <div>popover content</div>,
  title: 'Filter by',
  panelClassName: 'w-64',
}
