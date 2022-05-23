import { ReactNode, useState } from 'react'

import { createContext } from '~/app/lib/utils/context'

interface contextProps {
  step: number
}

export interface StepperContextProps {
  activeStep: number
  setActiveStep: (value: number) => void
}

const StepperContext = createContext<StepperContextProps>()

export function useStepperContextSetup({
  step: initialStep,
}: contextProps): StepperContextProps {
  const [activeStep, setActiveStep] = useState(initialStep)

  return {
    activeStep,
    setActiveStep,
  }
}

export function StepperContextProvider({
  children,
  step,
}: {
  children: ReactNode
  step: number
}) {
  const value = useStepperContextSetup({ step })
  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}

export const useStepperContext = StepperContext.useContext
