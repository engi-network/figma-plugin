import { Children, ReactNode } from 'react'

import StepContainer from './Steps/StepContainer'

interface StepperProps {
  activeStep: number
  children: ReactNode
  className?: string
  orientation?: 'horizontal' | 'vertical'
}

function Stepper({
  children,
  activeStep,
  className,
  orientation = 'horizontal',
}: StepperProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol
        role="list"
        className={`flex items-center ${
          orientation === 'horizontal' ? 'flex-row' : 'flex-col'
        }`}
      >
        {Children.map(children, (child, index) => (
          <StepContainer
            step={index}
            isLast={index === Children.count(children) - 1}
            activeStep={activeStep}
            orientation={orientation}
          >
            {child}
          </StepContainer>
        ))}
      </ol>
    </nav>
  )
}

export default Stepper
