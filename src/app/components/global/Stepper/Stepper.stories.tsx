import { useState } from 'react'

import Stepper from './Stepper'

export default {
  component: Stepper,
  title: 'Global/Components/Stepper',
}

export function StepperWithKnobs() {
  const [step, _] = useState(2)

  return (
    <div className="bg-slate-800 h-96 pl-10 pt-10">
      <Stepper activeStep={step}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
        <div>Item4</div>
      </Stepper>
    </div>
  )
}
