import { select } from '@storybook/addon-knobs'
import { useState } from 'react'

import { mapStepToIcon } from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'

import Step from './Step/Step'
import Stepper from './Stepper'

export default {
  component: Stepper,
  title: 'Global/Components/Stepper',
}

export function StepperWithKnobs() {
  const [step, _] = useState(2)
  const orientation = select(
    'Orientation',
    ['horizontal', 'vertical'],
    'horizontal',
  )

  return (
    <div className="bg-slate-800 h-full p-10">
      <Stepper activeStep={step} orientation={orientation}>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Step className="p-2" key={index}>
              {mapStepToIcon(20, 20)[index]}
            </Step>
          ))}
      </Stepper>
    </div>
  )
}
