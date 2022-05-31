import {
  CameraIcon,
  CompareIcon,
  FolderIcon,
  StorybookIcon,
  WrenchIcon,
} from '~/app/components/global/Icons'
import Step from '~/app/components/global/Stepper/Step'
import Stepper from '~/app/components/global/Stepper/Stepper'

interface Props {
  className?: string
  step: number
}

function LoadingStepper({ step, className }: Props) {
  return (
    <div className={className}>
      <Stepper activeStep={step}>
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

export default LoadingStepper
