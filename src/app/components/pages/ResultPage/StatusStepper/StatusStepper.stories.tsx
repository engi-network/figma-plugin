import { useState } from 'react'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'
import { getPlaceholderImageUrl } from '~/app/lib/utils/string'
import { STEP_MAP_TO_STEPPER, STEP_MESSAGES } from '~/app/pages/Main/Main.types'

import StatusStepper from './StatusStepper'

export default {
  component: StatusStepper,
  title: 'Pages/Result/StatusStepper',
}

export function StatusStepperWithKnobs() {
  const [step, _] = useState(5)
  const imageUrl = getPlaceholderImageUrl([120, 40])

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
      />
    </StoryContainer>
  )
}
