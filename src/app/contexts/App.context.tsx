import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import { createContext } from '~/app/lib/utils/context'
import { History, STATUS } from '~/app/models/Report'

export interface AppContextProps {
  globalError: string
  history: History
  numberOfInProgress: number
  setGlobalError: Dispatch<SetStateAction<string>>
  setHistory: Dispatch<SetStateAction<History>>
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const { history, setHistory } = useHistoryEvent()
  const [globalError, setGlobalError] = useState('')
  const [numberOfInProgress, setNumberOfInProgress] = useState(0)

  useEffect(() => {
    const numberOfInProgress = history.filter(
      (item) => item.status === STATUS.IN_PROGRESS,
    ).length

    setNumberOfInProgress(numberOfInProgress)
  }, [history])

  useEffect(() => {
    console.info('history changed==>', history)
  }, [history.length])

  return {
    globalError,
    history,
    numberOfInProgress,
    setGlobalError,
    setHistory,
  }
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const value = useAppContextSetup()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = AppContext.useContext
