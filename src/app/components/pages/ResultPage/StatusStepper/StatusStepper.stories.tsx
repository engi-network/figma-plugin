import { useState } from 'react'

import Container from '~/app/components/modules/Storybook/Container/Container'

import StatusStepper from './StatusStepper'

export default {
  component: StatusStepper,
  title: 'Pages/Result/StatusStepper',
}

export function StatusStepperWithKnobs() {
  const [step, _] = useState(3)

  return (
    <Container>
      <StatusStepper activeStep={step} />
    </Container>
  )
}
