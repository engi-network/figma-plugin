import { useState } from 'react'

import StoryContainer from '~/app/components/modules/Storybook/StoryContainer/StoryContainer'

import StatusStepper from './StatusStepper'

export default {
  component: StatusStepper,
  title: 'Pages/Result/StatusStepper',
}

export function StatusStepperWithKnobs() {
  const [step, _] = useState(3)

  return (
    <StoryContainer>
      <StatusStepper activeStep={step} />
    </StoryContainer>
  )
}
