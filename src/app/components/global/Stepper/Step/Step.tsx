import { ReactNode, useMemo } from 'react'

import { useStepperContext } from '../Stepper.context'
import { StepContextProvider } from './Step.context'
import StepRoot from './StepRoot'

export interface StepProps {
  active?: boolean
  children: ReactNode
  completed?: boolean
  connector?: ReactNode
  disabled?: boolean
  index?: number
  last?: boolean
}

function Step({
  children,
  active: activeProp,
  disabled: disabledProp,
  completed: completedProp,
  index = 0,
  last = false,
}: StepProps) {
  const { orientation, activeStep, connector } = useStepperContext()

  let [active = false, completed = false, disabled = false] = [
    activeProp,
    completedProp,
    disabledProp,
  ]

  if (activeStep === index) {
    active = activeProp !== undefined ? activeProp : true
  } else if (activeStep > index) {
    completed = completedProp !== undefined ? completedProp : true
  } else if (activeStep < index) {
    disabled = disabledProp !== undefined ? disabledProp : true
  }

  const contextValues = useMemo(
    () => ({
      active,
      completed,
      disabled,
      index,
      last,
    }),
    [index, last, active, completed, disabled],
  )

  return (
    <StepContextProvider values={contextValues}>
      <StepRoot
        last={last}
        step={index}
        orientation={orientation}
        active={active}
        completed={completed}
        disabled={disabled}
        connector={connector}
      >
        <li>{children}</li>
      </StepRoot>
    </StepContextProvider>
  )
}

export default Step
