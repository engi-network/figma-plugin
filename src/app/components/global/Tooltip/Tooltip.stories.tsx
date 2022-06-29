import { select, text } from '@storybook/addon-knobs'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import Tooltip from './Tooltip'

export default {
  component: Tooltip,
  title: 'Global/Tooltip',
}

export function TooltipStory() {
  return (
    <StoryContainer>
      <Tooltip
        label={text('Label', 'Tooltip content')}
        placement={select(
          'Placement',
          ['right', 'left', 'top', 'bottom'],
          'right',
        )}
      >
        <div>Click to open tooltip</div>
      </Tooltip>
    </StoryContainer>
  )
}
