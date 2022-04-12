import { action } from '@storybook/addon-actions'
import { boolean, select, text } from '@storybook/addon-knobs'

import Button from './Button'

export default {
  component: Button,
  title: 'Global/Components/Button',
}

export function ButtonWithKnobs() {
  const isDisabled = boolean('Disabled?', false)
  const mode = select('Primary', [true, false], false)

  return (
    <div>
      <Button
        label="test"
        primary={mode}
        onClick={action('button click')}
        disabled={isDisabled}
      >
        {text('Label', 'Button Label')}
      </Button>
    </div>
  )
}
