import { Children, ReactNode } from 'react'

import Step from './Step'

interface StepperProps {
  activeStep: number
  children: ReactNode
}

function Stepper({ children, activeStep }: StepperProps) {
  return (
    <div>
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center flex-col">
          {Children.map(children, (child, index) => (
            <Step
              step={index}
              isLast={index === Children.count(children) - 1}
              activeStep={activeStep}
            >
              {child}
            </Step>
          ))}
        </ol>
      </nav>
    </div>
  )
}

export default Stepper
