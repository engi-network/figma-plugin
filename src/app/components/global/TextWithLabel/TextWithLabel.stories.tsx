import { ComponentMeta, ComponentStory } from '@storybook/react'

import TextWithLabel from './TextWithLabel'

export default {
  component: TextWithLabel,
  title: 'Global/Components/TextWithLabel',
} as ComponentMeta<typeof TextWithLabel>

const Template: ComponentStory<typeof TextWithLabel> = (args) => (
  <div className="bg-primary-white">
    <TextWithLabel {...args} />
  </div>
)

export const TextWithLabelStory = Template.bind({})
TextWithLabelStory.args = {
  id: 'text-with-label-id',
  label: 'label',
  placeholder: 'Placeholder',
  text: 'Text',
}
