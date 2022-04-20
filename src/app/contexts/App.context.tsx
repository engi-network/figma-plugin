import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import { createContext } from '~/app/lib/utils/context'
import { DetailedReport, Report } from '~/app/models/Report'

export interface AppContextProps {
  history: Array<DetailedReport>
  report?: Report
  setHistory: Dispatch<SetStateAction<DetailedReport[]>>
  setReport: (value: DetailedReport) => void
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<DetailedReport>()
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
