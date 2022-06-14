import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import SocketManager from '~/app/lib/services/socket-manager'
import { createContext } from '~/app/lib/utils/context'
import { dispatchData } from '~/app/lib/utils/event'
import { replaceItemInArray } from '~/app/lib/utils/object'
import {
  DetailedReport,
  ErrorResult,
  History,
  SocketData,
  STATUS,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

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
  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId') as string
  const navigate = useNavigate()

  // this ws callback for handling things in background in the case of not on loading state for other websockets
  const wsCallback = async (event: MessageEvent) => {
    const { check_id, step, step_count, error } = JSON.parse(
      event.data,
    ) as SocketData

    try {
      if (step === step_count - 1) {
        const report = await AWSService.fetchReportById(
          check_id,
          STATUS.SUCCESS,
        )
        const baseReport = history.find((item) => item.checkId === check_id)
        const detailedReport: DetailedReport = {
          checkId: check_id,
          originalImageUrl: baseReport?.originalImageUrl,
          result: {
            ...baseReport?.result,
            ...report.result,
          },
          status: STATUS.SUCCESS,
        }

        setReport(detailedReport)

        const replacedArray = replaceItemInArray(
          history,
          'checkId',
          check_id,
          detailedReport,
        )
        setHistory(replacedArray)

        dispatchData({
          type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
          data: detailedReport,
        })

        SocketManager.terminateById(check_id, 1000, 'Successfully closed')
        return
      }

      // error
      if (error) {
        const baseReport = history.find((item) => item.checkId === check_id)
        const detailedReport: DetailedReport = {
          checkId: check_id,
          originalImageUrl: baseReport?.originalImageUrl,
          result: {
            ...baseReport?.result,
            error,
          } as ErrorResult,
          status: STATUS.FAIL,
        }

        const replacedArray = replaceItemInArray(
          history,
          'checkId',
          check_id,
          detailedReport,
        )

        setHistory(replacedArray)
        setGlobalError('Something went wrong. Please double check the inputs.')
        dispatchData({
          type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
          data: detailedReport,
        })

        Sentry.sendReport({
          error,
          transactionName: SENTRY_TRANSACTION.GET_REPORT,
          tagData: { check_id },
        })

        SocketManager.terminateById(
          check_id,
          1000,
          'Got error report from server',
        )
        navigate(ROUTES_MAP[ROUTES.ERROR])
        return
      }
    } catch (error) {
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.GET_REPORT,
        tagData: { check_id },
      })
      const message = (error as Error).message
      setGlobalError(message || 'Something went wrong with socket callback!')
      navigate({ pathname: ROUTES_MAP[ROUTES.ERROR] })
    }
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
