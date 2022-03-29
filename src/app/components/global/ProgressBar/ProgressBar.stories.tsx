import { number, text } from '@storybook/addon-knobs'

import ProgressBar from './ProgressBar'

export default {
  component: ProgressBar,
  title: 'Global/ProgressBar',
}

export function ProgressBarWithKnobs() {
  const percent = number('Percentage', 45, {})

  return (
    <div>
      <ProgressBar
        percentage={percent}
        label={text('Label', `ProgressBar Label ${percent}%`)}
      />
    </div>
  )
}
