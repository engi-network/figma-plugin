import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import { createContext } from '~/app/lib/utils/context'
import { Report } from '~/app/models/Report'

export interface AppContextProps {
  report?: Report
  reportList: Array<Report>
  setReport: (value: Report) => void
  setReportList: Dispatch<SetStateAction<Report[]>>
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<Report>()
  const [reportList, setReportList] = useState<Array<Report>>([])
  useHistoryEvent()

  return {
    report,
    setReport,
    reportList,
    setReportList,
  }
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const value = useAppContextSetup()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = AppContext.useContext
