import { ReactNode } from 'react'

import { useStepperContext } from './Stepper.context'

interface StepperItemProps {
  children: ReactNode
  isLast: boolean
  step: number
}

function Step({ children, step, isLast }: StepperItemProps) {
  const { activeStep } = useStepperContext()

  const isPassed = activeStep > step
  const bgColor = isPassed ? 'bg-primary-white' : 'bg-primary-white/30'

  return (
    <li className={`relative ${isLast ? '' : 'h-20'}`}>
      {!isLast && (
        <div
          className="absolute inset-0 flex justify-center "
          aria-hidden="true"
        >
          <div className={`h-full w-0.5 ${bgColor}`}></div>
        </div>
      )}
      <div
        className={`flex items-center justify-center ${bgColor} rounded-full`}
      >
        {children}
      </div>
    </li>
  )
}

export default Step
