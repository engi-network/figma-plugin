import Step from '~/app/components/global/Stepper/Step/Step'
import Stepper from '~/app/components/global/Stepper/Stepper'
import { mapStepToIcon } from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'

interface Props {
  className?: string
  step: number
}

function LoadingStepper({ step, className }: Props) {
  return (
    <div className={className}>
      <Stepper activeStep={step} orientation="vertical">
        {Array(6)
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

export default LoadingStepper
