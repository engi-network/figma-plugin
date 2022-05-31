import { ReactNode } from 'react'

import { createContext } from '~/app/lib/utils/context'

export interface StepContextValueProps {
  active: boolean
  completed: boolean
  disabled: boolean
  index: number
  last: boolean
}

const StepContext = createContext<StepContextValueProps>()

export function useStepContextSetup(
  values: StepContextValueProps,
): StepContextValueProps {
  const { active, completed, disabled, index, last } = values

  return {
    active,
    completed,
    disabled,
    index,
    last,
  }
}

export function StepContextProvider({
  children,
  values,
}: {
  children: ReactNode
  values: StepContextValueProps
}) {
  const value = useStepContextSetup(values)
  return <StepContext.Provider value={value}>{children}</StepContext.Provider>
}

export const useStepContext = StepContext.useContext
