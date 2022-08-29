import { ComponentMeta, ComponentStory } from '@storybook/react'

import ToolTip from './Tooltip'

export default {
  component: ToolTip,
  title: 'Global/Tooltip',
  argTypes: {
    placement: {
      control: 'select',
      options: ['right', 'left', 'top', 'bottom'],
    },
    trigger: ['click', 'hover'],
  },
} as ComponentMeta<typeof ToolTip>

const Template: ComponentStory<typeof ToolTip> = (args) => (
  <div>
    <ToolTip {...args}>{args.children}</ToolTip>
  </div>
)

export const ToolTipStory = Template.bind({})
ToolTipStory.args = {
  children: <span>Click to open tooltip</span>,
  className: 'inline-flex',
  content: <span>I am a tooltip I am a long content to display</span>,
  placement: 'right',
  tooltipOffset: 10,
  trigger: 'click',
}
