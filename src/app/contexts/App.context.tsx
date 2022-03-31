import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import { createContext } from '~/app/lib/utils/context'
import { Report } from '~/app/models/Report'

export const mockReport: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308f',
  result: {
    MAE: '24587.6 (0.375183)',
  },
}

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
