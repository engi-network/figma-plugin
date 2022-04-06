import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import { createContext } from '~/app/lib/utils/context'
import { Report } from '~/app/models/Report'

export interface AppContextProps {
  history: Array<Report>
  report?: Report
  setHistory: Dispatch<SetStateAction<Report[]>>
  setReport: (value: Report) => void
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<Report>()
  const { history, setHistory } = useHistoryEvent()

  return {
    history,
    report,
    setReport,
    setHistory,
  }
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const value = useAppContextSetup()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = AppContext.useContext
