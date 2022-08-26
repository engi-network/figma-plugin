import { ArrowLeftIcon } from '@heroicons/react/solid'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { BUTTON_STYLE } from '~/app/lib/constants'

import IconButton from './IconButton'

export default {
  component: IconButton,
  title: 'Global/Components/IconButton',
  argTypes: {
    buttonStyle: {
      control: 'select',
      options: [BUTTON_STYLE.OUTLINED, BUTTON_STYLE.SOLID],
    },
    onClick: { action: 'clicked' },
  },
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => (
  <StoryContainer>
    <IconButton {...args}>{args.children}</IconButton>
  </StoryContainer>
)

export const IconButtonStory = Template.bind({})

IconButtonStory.args = {
  buttonStyle: BUTTON_STYLE.OUTLINED,
  icon: <ArrowLeftIcon className="w-4 h-4 text-primary-dark" />,
  children: 'Button Label',
}

export const IconLinkButtonStory = Template.bind({})
IconLinkButtonStory.args = {
  as: 'a',
  buttonStyle: BUTTON_STYLE.OUTLINED,
  children: 'Button text',
  href: 'https://google.com',
  icon: <ArrowLeftIcon className="w-4 h-4 text-primary-dark" />,
  target: '_blank',
}
