import { ReactNode } from 'react'

import { createContext } from '~/app/lib/utils/context'

export interface StepperContextProps {
  activeStep: number
  orientation: 'horizontal' | 'vertical'
}

const StepperContext = createContext<StepperContextProps>()

export function useStepperContextSetup(
  values: Partial<StepperContextProps>,
): StepperContextProps {
  const { activeStep = 0, orientation = 'horizontal' } = values

  return {
    activeStep,
    orientation,
  }
}

export function StepperContextProvider({
  children,
  values,
}: {
  children: ReactNode
  values: Partial<StepperContextProps>
}) {
  const value = useStepperContextSetup(values)
  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  )
}

export const useStepperContext = StepperContext.useContext
