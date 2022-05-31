import cn from 'classnames'
import { ReactNode } from 'react'

interface StepperItemProps {
  activeStep: number
  children: ReactNode
  isLast: boolean
  orientation: 'horizontal' | 'vertical'
  step: number
}

function StepContainer({
  children,
  step,
  isLast,
  activeStep,
  orientation,
}: StepperItemProps) {
  const isPassed = activeStep > step
  const isCurrent = activeStep === step
  const borderColor = isPassed ? 'border-primary-green' : 'border-[ffffff4d]'

  const bodyClasses = cn(
    { 'border-primary-green': isCurrent },
    `relative flex items-center justify-center rounded-full p-2 border ${borderColor}`,
    { 'bg-primary-green': isCurrent },
  )

  const isHorizontal = orientation === 'horizontal'

  const rootClasses = cn(
    'relative flex',
    {
      'flex-row': isHorizontal,
    },
    { 'flex-col': !isHorizontal },
    { 'w-20': !isLast && isHorizontal },
    { 'h-20': !isLast && !isHorizontal },
    { 'w-0': isLast && isHorizontal },
    { 'h-0': isLast && !isHorizontal },
  )

  const bridgeClasses = cn(
    `border-[0.5px] ${borderColor}`,
    {
      'w-full h-[1px]': isHorizontal,
    },
    {
      'h-full w-[1px]': !isHorizontal,
    },
  )

  return (
    <li className={rootClasses}>
      <div className={bodyClasses}>{children}</div>
      {!isLast && (
        <div
          className="flex justify-center items-center flex-1"
          aria-hidden="true"
        >
          <div className={bridgeClasses} />
        </div>
      )}
    </li>
  )
}

export default StepContainer
