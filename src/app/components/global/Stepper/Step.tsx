import cn from 'classnames'
import { ReactNode } from 'react'

interface StepperItemProps {
  activeStep: number
  children: ReactNode
  isLast: boolean
  step: number
}

function Step({ children, step, isLast, activeStep }: StepperItemProps) {
  const isPassed = activeStep > step
  const isCurrent = activeStep === step
  const borderColor = isPassed ? 'border-primary-green' : 'border-[ffffff4d]'

  const childrenClasses = cn(
    `relative flex items-center justify-center rounded-full p-2 border ${borderColor}`,
    { 'bg-primary-green': isCurrent },
  )

  return (
    <li className={`relative flex flex-col ${isLast ? '' : 'h-20'}`}>
      <div className={childrenClasses}>{children}</div>
      {!isLast && (
        <div className="flex justify-center flex-1" aria-hidden="true">
          <div className={`h-full w-[1px] border-[0.5px] ${borderColor}`} />
        </div>
      )}
    </li>
  )
}

export default Step
