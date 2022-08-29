import { ComponentMeta, ComponentStory } from '@storybook/react'

import TogglePanel from './TogglePanel'

export default {
  component: TogglePanel,
  title: 'Global/Components/TogglePanel',
} as ComponentMeta<typeof TogglePanel>

const Template: ComponentStory<typeof TogglePanel> = (args) => (
  <div className="h-64 bg-slate-700">
    <TogglePanel {...args}>{args.children}</TogglePanel>
  </div>
)

export const TogglePanelStory = Template.bind({})

TogglePanelStory.args = {
  title: 'Click me',
  className: 'w-32',
  children: <div>Toggle panel body</div>,
}
