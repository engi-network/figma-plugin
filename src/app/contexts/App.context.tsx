import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
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
  ErrorResult,
  History,
  SocketData,
  STATUS,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

import { ROUTES, ROUTES_MAP } from '../lib/constants'

export interface AppContextProps {
  globalError: string
  history: History
  numberOfInProgress: number
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
  const [numberOfInProgress, setNumberOfInProgress] = useState(0)
  const location = useLocation()
  const navigate = useNavigate()

  const state = (location.state as QueryState) ?? {}
  const checkId = (state as Record<string, string>).checkId as unknown as string

  console.info('I am on loading screen===>', checkId)
  // this ws callback for handling things in background in the case of not on loading state for other websockets
  const wsCallback = async (event: MessageEvent) => {
    const { check_id, step, step_count, error } = JSON.parse(
      event.data,
    ) as SocketData

    if (step === step_count - 1) {
      const report = await AWSService.fetchReportById(check_id, STATUS.SUCCESS)
      const baseReport = history.find((item) => item.checkId === check_id)
      const detailedReport: DetailedReport = {
        checkId: check_id,
        imageUrl: baseReport?.imageUrl,
        result: {
          ...baseReport?.result,
          ...report.result,
        },
        status: STATUS.SUCCESS,
      }

      console.debug('=========> before filtering', history)
      console.debug('=========> detailed report', detailedReport)

      const filteredHistory = history.filter(
        (item) => item.checkId !== check_id,
      )
      console.debug('========> filtered history', filteredHistory)
      setHistory([...filteredHistory, detailedReport])
      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })
      setReport(detailedReport)
      // if this is the current one
      console.debug('checkId and check_id====>', checkId, check_id)
      if (checkId === check_id) {
        navigate(ROUTES_MAP[ROUTES.RESULT])
      }

      SocketManager.terminateById(check_id, 1000, 'Successfully closed')
      return
    }

    // error
    if (error) {
      console.error('api error background socket callback', check_id, error)
      const baseReport = history.find((item) => item.checkId === check_id)
      const detailedReport: DetailedReport = {
        checkId: check_id,
        imageUrl: baseReport?.imageUrl,
        result: {
          ...baseReport?.result,
          error,
        } as ErrorResult,
        status: STATUS.FAIL,
      }

      const filteredHistory = history.filter(
        (item) => item.checkId !== check_id,
      )
      setHistory([...filteredHistory, detailedReport])
      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })

      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.GET_REPORT,
        tagData: { check_id },
      })

      if (checkId === check_id) {
        setGlobalError('Something went wrong. Please double check the inputs.')
        navigate(ROUTES_MAP[ROUTES.ERROR])
      }

      SocketManager.terminateById(
        check_id,
        1000,
        'Got error report from server',
      )
      return
    }

    // when in progress
  }

  // update subscribe when history and check id change

  useEffect(() => {
    SocketManager.wsList?.forEach((ws) => {
      ws.wsHandler.updateSubscribe('wsCallback', wsCallback)
    })
  }, [checkId, history])

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
