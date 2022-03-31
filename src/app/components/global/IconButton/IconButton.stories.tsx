import { ArrowLeftIcon } from '@heroicons/react/solid'
import { action } from '@storybook/addon-actions'
import { select, text } from '@storybook/addon-knobs'

import { BUTTON_STYLE } from '~/app/lib/constants'

import IconButton from './IconButton'

export default {
  component: IconButton,
  title: 'Global/Components/Button',
}

export function IconButtonWithKnobs() {
  const buttonStyle = select(
    'ButtonStyles',
    [BUTTON_STYLE.OUTLINED, BUTTON_STYLE.SOLID],
    BUTTON_STYLE.OUTLINED,
  )

  return (
    <div>
      <IconButton
        icon={<ArrowLeftIcon className="w-4 h-4 text-primary-dark" />}
        buttonStyle={buttonStyle}
        onClick={action('Click button')}
      >
        {text('Text', 'Button text')}
      </IconButton>
    </div>
  )
}
