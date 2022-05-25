import {
  CameraIcon,
  CompareIcon,
  FolderIcon,
  StorybookIcon,
  WrenchIcon,
} from '~/app/components/global/Icons'
import Stepper from '~/app/components/global/Stepper/Stepper'

interface Props {
  className?: string
  step: number
}

function LoadingStepper({ step, className }: Props) {
  return (
    <div className={className}>
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

export default LoadingStepper
