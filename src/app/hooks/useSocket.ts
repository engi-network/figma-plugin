import { useCallback, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import SocketService from '~/app/lib/services/socket'
import { dispatchData } from '~/app/lib/utils/event'
import { replaceItemInArray } from '~/app/lib/utils/object'
import {
  DetailedReport,
  ErrorResult,
  SocketData,
  STATUS,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

function useSocket() {
  const { setGlobalError, history, setHistory, setReport } = useAppContext()

  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId') as string
  const navigate = useNavigate()
  // this ws callback for handling things in background in the case of not on loading state for other websockets
  const socketCallback = useCallback(
    async (data) => {
      const { check_id, step, step_count, error } = data as SocketData

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

          SocketService.unsubscribe(checkId, socketCallback)
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
          setGlobalError(
            'Something went wrong. Please double check the inputs.',
          )
          dispatchData({
            type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
            data: detailedReport,
          })

          Sentry.sendReport({
            error,
            transactionName: SENTRY_TRANSACTION.GET_REPORT,
            tagData: { check_id },
          })

          SocketService.unsubscribe(checkId, socketCallback)
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
        SocketService.unsubscribe(checkId, socketCallback)
        setGlobalError(message || 'Something went wrong with socket callback!')
        navigate({ pathname: ROUTES_MAP[ROUTES.ERROR] })
      }
    },
    [checkId, history],
  )

  // update subscribe when history and check id change because callback uses old history
  useEffect(() => {
    SocketService.updateSubscriptionFromWs(checkId, socketCallback)
  }, [checkId, history])

  return {
    socketCallback,
  }
}

export default useSocket
