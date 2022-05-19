import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import { QueryState } from '~/app/@types/route'
import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import SocketManager from '~/app/lib/services/socket-manager'
import { createContext } from '~/app/lib/utils/context'
import { dispatchData } from '~/app/lib/utils/event'
import {
  DetailedReport,
  History,
  SocketData,
  STATUS,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

import { ROUTES, ROUTES_MAP } from '../lib/constants'

export interface AppContextProps {
  globalError: string
  history: History
  report?: DetailedReport
  setGlobalError: Dispatch<SetStateAction<string>>
  setHistory: Dispatch<SetStateAction<History>>
  setReport: (value: DetailedReport) => void
  wsCallback: (event: MessageEvent) => void
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<DetailedReport>()
  const { history, setHistory } = useHistoryEvent()
  const [globalError, setGlobalError] = useState('')
  // const [currentCheckId, setCurrentCheckId] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const state = (location.state as QueryState) ?? {}
  const checkId = (state as Record<string, string>).checkId as unknown as string

  // this ws callback for handling things in background in the case of not on loading state for other websockets
  const wsCallback = useCallback(
    async (event: MessageEvent) => {
      const { check_id, step, step_count, error } = JSON.parse(
        event.data,
      ) as SocketData

      if (step === step_count - 1) {
        const report = await AWSService.fetchReportById(
          check_id,
          STATUS.SUCCESS,
        )
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

        const filteredHistory = history.filter(
          (item) => item.checkId !== check_id,
        )

        setHistory([...filteredHistory, detailedReport])
        setReport(detailedReport)
        SocketManager.terminateById(check_id)

        // if this is the current one
        if (checkId === check_id) {
          navigate(ROUTES_MAP[ROUTES.RESULT])
        }
        return
      }

      // error
      if (error) {
        console.error('api error background socket callback', check_id, error)
        const errorReport = await AWSService.fetchReportById(
          check_id,
          STATUS.FAIL,
        )
        console.error('error report=====> in the background', errorReport)
        const filteredHistory = history.filter(
          (item) => item.checkId !== check_id,
        )
        setHistory(filteredHistory)
        Sentry.sendReport({
          error,
          transactionName: SENTRY_TRANSACTION.GET_REPORT,
          tagData: { check_id },
        })

        if (checkId === check_id) {
          setGlobalError(
            'Something went wrong. Please double check the inputs.',
          )
          navigate(ROUTES_MAP[ROUTES.HOME])
        }

        SocketManager.terminateById(check_id)
        return
      }

      // when in progress
    },
    [checkId],
  )

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
