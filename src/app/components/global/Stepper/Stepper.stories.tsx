import { useState } from 'react'

import {
  CameraIcon,
  CompareIcon,
  FolderIcon,
  StorybookIcon,
  WrenchIcon,
} from '../Icons'
import Stepper from './Stepper'

export default {
  component: Stepper,
  title: 'Global/Components/Stepper',
}

export function StepperWithKnobs() {
  const [step, _] = useState(2)

  return (
    <div className="bg-slate-800 h-full p-10">
      <Stepper activeStep={step}>
        <div>
          <FolderIcon width={20} height={20} />
        </div>
        <div>
          <WrenchIcon width={20} height={20} />
        </div>
        <div>
          <StorybookIcon width={20} height={20} />
        </div>
        <div>
          <CameraIcon width={20} height={20} />
        </div>
        <div>
          <CompareIcon width={20} height={20} />
        </div>
      </Stepper>
    </div>
  )
}
