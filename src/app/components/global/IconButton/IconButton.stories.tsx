import { ArrowLeftIcon } from '@heroicons/react/solid'
import { action } from '@storybook/addon-actions'
import { select, text } from '@storybook/addon-knobs'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { BUTTON_STYLE } from '~/app/lib/constants'

import IconButton from './IconButton'

export default {
  component: IconButton,
  title: 'Global/Components/IconButton',
}

export function IconButtonWithKnobs() {
  const buttonStyle = select(
    'ButtonStyles',
    [BUTTON_STYLE.OUTLINED, BUTTON_STYLE.SOLID],
    BUTTON_STYLE.OUTLINED,
  )

  return (
    <StoryContainer>
      <IconButton
        icon={<ArrowLeftIcon className="w-4 h-4 text-primary-dark" />}
        buttonStyle={buttonStyle}
        onClick={action('Click button')}
      >
        {text('Text', 'Button text')}
      </IconButton>
    </StoryContainer>
  )
}

export function IconLinkButtonStory() {
  const buttonStyle = select(
    'ButtonStyles',
    [BUTTON_STYLE.OUTLINED, BUTTON_STYLE.SOLID],
    BUTTON_STYLE.OUTLINED,
  )

  return (
    <StoryContainer>
      <IconButton
        as="a"
        icon={<ArrowLeftIcon className="w-4 h-4 text-primary-dark" />}
        buttonStyle={buttonStyle}
        href="https://google.com"
        target="_blank"
      >
        {text('Text', 'Button text')}
      </IconButton>
    </StoryContainer>
  )
}
