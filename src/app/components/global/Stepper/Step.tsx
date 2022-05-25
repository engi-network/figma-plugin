import { ReactNode } from 'react'

interface StepperItemProps {
  activeStep: number
  children: ReactNode
  isLast: boolean
  step: number
}

function Step({ children, step, isLast, activeStep }: StepperItemProps) {
  const isPassed = activeStep > step
  const bgColor = isPassed ? 'bg-primary-white' : 'bg-[#ffffff4d]'

  return (
    <li className={`relative flex flex-col ${isLast ? '' : 'h-20'}`}>
      <div
        className={`relative flex items-center justify-center ${bgColor} rounded-full p-2`}
      >
        {children}
      </div>
      {!isLast && (
        <div className="flex justify-center flex-1" aria-hidden="true">
          <div className={`h-full w-0.5 ${bgColor}`}></div>
        </div>
      )}
    </li>
  )
}

export default Step
