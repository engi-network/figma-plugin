import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { createContext } from '~/app/lib/utils/context'
import { DetailedReport, History, SocketData } from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

import { dispatchData } from '../lib/utils/event'

export interface AppContextProps {
  globalError: string
  history: History
  report?: DetailedReport
  setGlobalError: Dispatch<SetStateAction<string>>
  setHistory: Dispatch<SetStateAction<DetailedReport[]>>
  setReport: (value: DetailedReport) => void
  wsCallback: (event: MessageEvent) => void
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<DetailedReport>()
  const { history, setHistory } = useHistoryEvent()
  const [globalError, setGlobalError] = useState('')
  const wsCallback = async (event: MessageEvent) => {
    const { check_id, step, step_count, error } = JSON.parse(
      event.data,
    ) as SocketData

    // success this is background callback so that need to consider which is the current one.
    // if this is the current one is on loading screen, don't need to run the callback

    // if (isCurrent) {
    //   return;
    // }

    if (step === step_count - 1) {
      const report = await AWSService.fetchReportById(check_id)
      const { story, component } = report.result
      const presignedUrl = await AWSService.getPresignedUrl(
        story || component,
        check_id,
      )
      const detailedReport = { ...report, imageUrl: presignedUrl }

      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })

      setHistory((prev) => [...prev, detailedReport])
      setReport(detailedReport)
    }

    // error
    if (error) {
      console.error('api error background socket callback', check_id, error)
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.GET_REPORT,
        tagData: { check_id },
      })
    }
  }

  return {
    globalError,
    history,
    report,
    setGlobalError,
    setHistory,
    setReport,
    wsCallback,
  }
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const value = useAppContextSetup()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = AppContext.useContext
