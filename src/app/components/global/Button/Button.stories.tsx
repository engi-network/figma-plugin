import { action } from '@storybook/addon-actions'
import { select, text } from '@storybook/addon-knobs'

import Button from './Button'

export default {
  component: Button,
  title: 'Global/Button',
}

export function ButtonWithKnobs() {
  const mode = select('Primary', [true, false], false)

  return (
    <div>
      <Button label="test" primary={mode} onClick={action('button click')}>
        {text('Label', 'Button Label')}
      </Button>
    </div>
  )
}
