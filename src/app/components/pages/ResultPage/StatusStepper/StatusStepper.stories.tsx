import { select } from '@storybook/addon-knobs'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { getPlaceholderImageUrl } from '~/app/lib/utils/string'
import { STEP_MAP_TO_STEPPER, STEP_MESSAGES } from '~/app/pages/Main/Main.types'

import StatusStepper from './StatusStepper'

export default {
  component: StatusStepper,
  title: 'Pages/Result/StatusStepper',
}

export function StatusStepperWithKnobs() {
  const imageUrl = getPlaceholderImageUrl([120, 120])
  const step = select('Step', [0, 1, 2, 3, 4, 5, 6, 7], 0)

  return (
    <StoryContainer>
      <StatusStepper
        activeStep={STEP_MAP_TO_STEPPER[step]}
        stepMessage={STEP_MESSAGES[step]}
        originalImageUrl={imageUrl}
        data={{
          code_paths: ['button.tsx', 'button.stories.tsx'],
          code_snippets: ['const a = b;', 'const b = c;'],
        }}
        layerName="layer-2"
        className="w-[140px]"
      />
    </StoryContainer>
  )
}
