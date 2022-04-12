import { number, text } from '@storybook/addon-knobs'

import ProgressBar from './ProgressBar'
import ProgressBarWithLabel from './ProgressBarWithLabel'

export default {
  component: ProgressBar,
  title: 'Global/Components/ProgressBar',
}

export function ProgressBarWithKnobs() {
  const percent = number('Percentage', 45, {})

  return (
    <div>
      <ProgressBar percentage={percent} label={text('Label', `${percent}%`)} />
    </div>
  )
}

export function ProgressBarWithLabelKnobs() {
  const percent = number('Percentage', 45, {})

  return (
    <div>
      <ProgressBarWithLabel
        title={text('Title', 'Cloning repository:')}
        percentage={percent}
      />
    </div>
  )
}
