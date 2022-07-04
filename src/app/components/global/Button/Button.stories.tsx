import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import Button from './Button'

export default {
  component: Button,
  title: 'Global/Components/Button',
}

export function ButtonStory() {
  const isDisabled = boolean('Disabled?', false)
  const mode = select('Primary', [true, false], false)

  return (
    <StoryContainer>
      <Button
        label="Click me"
        primary={mode}
        onClick={action('button click')}
        disabled={isDisabled}
        className="border border-primary-white"
      >
        {text('Label', 'Button Label')}
      </Button>
    </StoryContainer>
  )
}

export function LinkButtonStory() {
  const mode = select('Primary', [true, false], false)

  return (
    <StoryContainer>
      <Button
        label="Click me"
        primary={mode}
        onClick={action('button click')}
        className="border border-primary-white"
        as="a"
        href="https://google.com"
        target="_blank"
      >
        {text('Label', 'Button Label')}
      </Button>
    </StoryContainer>
  )
}
