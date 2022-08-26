import { ComponentMeta, ComponentStory } from '@storybook/react'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import Button from './Button'

export default {
  component: Button,
  title: 'Global/Components/Button',
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => (
  <StoryContainer>
    <Button {...args} />
  </StoryContainer>
)

export const ButtonStory = Template.bind({})
ButtonStory.args = {
  children: 'Button label',
  className: 'border border-primary-white',
  disabled: false,
  label: 'Button',
  primary: true,
}

export const LinkButtonStory = Template.bind({})
LinkButtonStory.args = {
  as: 'a',
  children: 'Click me',
  className: 'border border-primary-white',
  href: 'https://google.com',
  label: 'Click me',
  primary: false,
  target: '_blank',
}
