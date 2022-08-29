import { ComponentMeta, ComponentStory } from '@storybook/react'

import ProgressBar from './ProgressBar'
import ProgressBarWithLabel from './ProgressBarWithLabel'

export default {
  component: ProgressBar,
  title: 'Global/Components/ProgressBar',
} as ComponentMeta<typeof ProgressBar>

const Template: ComponentStory<typeof ProgressBar> = (args) => (
  <div>
    <ProgressBar {...args} />
  </div>
)

export const ProgressBarStory = Template.bind({})
ProgressBarStory.args = {
  percentage: 14,
  label: `${14}%`,
}

const ProgressBarWithLabelTemplate: ComponentStory<
  typeof ProgressBarWithLabel
> = (args) => (
  <div>
    <ProgressBarWithLabel {...args} />
  </div>
)

export const ProgressBarWithLabelStory = ProgressBarWithLabelTemplate.bind({})
ProgressBarWithLabelStory.args = {
  title: 'Cloning repo',
  percentage: 45,
  progressMinWidth: 40,
}
