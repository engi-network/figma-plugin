import { select } from '@storybook/addon-knobs'
import { useState } from 'react'

import {
  CameraIcon,
  CompareIcon,
  FolderIcon,
  StorybookIcon,
  WrenchIcon,
} from '../Icons'
import Step from './Step'
import Stepper from './Stepper'

export default {
  component: Stepper,
  title: 'Global/Components/Stepper',
}

export function StepperWithKnobs() {
  const [step, _] = useState(0)
  const orientation = select(
    'Orientation',
    ['horizontal', 'vertical'],
    'horizontal',
  )

  return (
    <div className="bg-slate-800 h-full p-10">
      <Stepper activeStep={step} orientation={orientation}>
        <Step>
          <FolderIcon width={20} height={20} />
        </Step>
        <Step>
          <WrenchIcon width={20} height={20} />
        </Step>
        <Step>
          <StorybookIcon width={20} height={20} />
        </Step>
        <Step>
          <CameraIcon width={20} height={20} />
        </Step>
        <Step>
          <CompareIcon width={20} height={20} />
        </Step>
      </Stepper>
    </div>
  )
}
