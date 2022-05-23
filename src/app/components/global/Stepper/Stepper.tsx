import { Children, ReactNode } from 'react'

import Step from './Step'
import { StepperContextProvider } from './Stepper.context'

interface StepperContainerProps {
  activeStep: number
  children: ReactNode
}

interface StepperProps {
  children: ReactNode
}

function Stepper({ children }: StepperProps) {
  return (
    <div>
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center flex-col">
          {Children.map(children, (child, index) => (
            <Step step={index} isLast={index === Children.count(children) - 1}>
              {child}
            </Step>
          ))}
        </ol>
      </nav>
    </div>
  )
}

function StepperContainer({ children, activeStep }: StepperContainerProps) {
  return (
    <StepperContextProvider step={activeStep}>
      <Stepper>{children}</Stepper>
    </StepperContextProvider>
  )
}

export default StepperContainer
