import {
  Children,
  cloneElement,
  isValidElement,
  ReactNode,
  useMemo,
} from 'react'

import { StepperContextProvider } from './Stepper.context'

export interface StepperProps {
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
  const contextValues = useMemo(
    () => ({
      activeStep,
      orientation,
    }),
    [activeStep, orientation],
  )

  const childrenArray = Children.toArray(children).filter(Boolean)

  const steps = childrenArray.map((step, index) => {
    if (isValidElement(step)) {
      return cloneElement(step, {
        index,
        last: index + 1 === childrenArray.length,
        ...step.props,
      })
    }
  })

  return (
    <StepperContextProvider values={contextValues}>
      <nav aria-label="Progress" className={className}>
        <ol
          role="list"
          className={`flex items-center ${
            orientation === 'horizontal' ? 'flex-row' : 'flex-col'
          }`}
        >
          {steps}
        </ol>
      </nav>
    </StepperContextProvider>
  )
}

export default Stepper
