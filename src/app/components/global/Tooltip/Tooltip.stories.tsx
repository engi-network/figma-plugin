import { select } from '@storybook/addon-knobs'

import Tooltip from './Tooltip'

export default {
  component: Tooltip,
  title: 'Global/Tooltip',
}

export function TooltipStory() {
  return (
    <div>
      <Tooltip
        content={<span>I am a tooltip I am a long content to display</span>}
        placement={select(
          'Placement',
          ['right', 'left', 'top', 'bottom'],
          'right',
        )}
        tooltipOffset={10}
        trigger={select('Trigger', ['click', 'hover'], 'click')}
        className="inline-flex"
      >
        <span>Click to open tooltip</span>
      </Tooltip>
    </div>
  )
}
