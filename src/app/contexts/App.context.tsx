import { Dispatch, ReactNode, SetStateAction, useState } from 'react'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import AWS from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { createContext } from '~/app/lib/utils/context'
import {
  DetailedReport,
  History,
  isError,
  SocketData,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

import { dispatchData } from '../lib/utils/event'

export interface AppContextProps {
  history: History
  report?: DetailedReport
  setHistory: Dispatch<SetStateAction<DetailedReport[]>>
  setReport: (value: DetailedReport) => void
  wsCallback: (event: MessageEvent) => void
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<DetailedReport>()
  const { history, setHistory } = useHistoryEvent()
  const wsCallback = async (event: MessageEvent) => {
    const {
      check_id,
      // step,
      // step_count,
      report: liveReport,
    } = JSON.parse(event.data) as SocketData

    if (!liveReport) {
      return
    }

    if (isError(liveReport.result)) {
      Sentry.sendReport({
        error: liveReport.result.error,
        transactionName: SENTRY_TRANSACTION.GET_REPORT,
        tagData: { check_id },
      })
    } else {
      const { story, component } = liveReport.result
      const presignedUrl = await AWS.getPresignedUrl(
        story || component,
        check_id,
      )
      const detailedReport = { ...liveReport, imageUrl: presignedUrl }
      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })
      setHistory((prev) => [...prev, detailedReport])
      setReport(detailedReport)
    }
  }

  return {
    history,
    report,
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
