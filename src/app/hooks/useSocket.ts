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
  ReportResult,
  SocketData,
  STATUS,
} from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

function useSocket() {
  const { setGlobalError, history, setHistory } = useAppContext()

  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId') as string
  const navigate = useNavigate()
  // this ws callback for handling things in background in the case of not on loading state for other websockets
  const socketCallback = useCallback(
    async (data) => {
      const { check_id, step, step_count, error } = data as SocketData

      const updateState = async (status: STATUS) => {
        const report =
          status === STATUS.SUCCESS
            ? await AWSService.fetchReportById(check_id, status)
            : undefined

        const baseReport = history.find((item) => item.checkId === check_id)
        const result =
          status === STATUS.FAIL
            ? ({
                ...baseReport?.result,
                error,
              } as ErrorResult)
            : ({
                ...baseReport?.result,
                ...report?.result,
              } as ReportResult)

        const detailedReport: DetailedReport = {
          checkId: check_id,
          originalImageUrl: baseReport?.originalImageUrl,
          result,
          status,
        }

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

        SocketService.unsubscribeFromWs(checkId, socketCallback)
      }

      try {
        // for the last step, successful case
        if (step === step_count - 1) {
          updateState(STATUS.SUCCESS)
          return
        }

        // error
        if (error) {
          updateState(STATUS.FAIL)
          setGlobalError(
            'Something went wrong. Please double check the inputs.',
          )

          Sentry.sendReport({
            error,
            transactionName: SENTRY_TRANSACTION.GET_REPORT,
            tagData: { check_id },
          })

          navigate({ pathname: ROUTES_MAP[ROUTES.ERROR] })
          return
        }
        //in progress
      } catch (error) {
        Sentry.sendReport({
          error,
          transactionName: SENTRY_TRANSACTION.GET_REPORT,
          tagData: { check_id },
        })
        const message = (error as Error).message
        SocketService.unsubscribeFromWs(checkId, socketCallback)
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
