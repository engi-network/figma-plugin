import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import Button from '~/app/components/global/Button/Button'
import Loader from '~/app/components/modules/Loader/Loader'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import AWSService from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import SocketManager from '~/app/lib/services/socket-manager'
import { dispatchData } from '~/app/lib/utils/event'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { SocketData } from '~/app/models/Report'
import { SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN } from '~/plugin/constants'

type QueryState = null | Record<string, string>

/**
 *
 * @TODO check if query has checkId and subscribe to that socket to receive data
 * @returns
 */

function Loading() {
  const { setGlobalError, setHistory, setReport } = useAppContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState<SocketData>({
    step: 0,
    step_count: 8,
    message: 'job started.',
  } as SocketData)
  const state = (location.state as QueryState) ?? {}

  const checkId = (state as Record<string, string>).checkId as unknown as string

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const ws = SocketManager.getSocketById(checkId)

  const fetchReport = async (checkId) => {
    const report = await AWSService.fetchReportById(checkId, 'success')
    const { story, component } = report.result
    const presignedUrl = await AWSService.getPresignedUrl(
      story || component,
      checkId,
    )
    const detailedReport = { ...report, imageUrl: presignedUrl }

    dispatchData({
      type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
      data: detailedReport,
    })

    setHistory((prev) => [...prev, detailedReport])
    setReport(detailedReport)
    navigate(ROUTES_MAP[ROUTES.RESULT])
    SocketManager.terminateById(checkId)
  }

  useEffect(() => {
    if (!ws) {
      return
    }

    const { wsHandler } = ws

    // this ws callback for handling things in foreground in loading state
    wsHandler.subscribe((event: MessageEvent) => {
      const data = JSON.parse(event.data) as SocketData
      setStatus(data)

      if (data.step === data.step_count - 1) {
        fetchReport(data.check_id)
      }

      if (data.error) {
        navigate(ROUTES_MAP[ROUTES.HOME])
        setGlobalError('Something went wrong. Please double check the inputs.')
        console.error('api error', data.error)
        Sentry.sendReport({
          error: data.error,
          transactionName: SENTRY_TRANSACTION.GET_REPORT,
          tagData: { checkId: data.check_id },
        })
        SocketManager.terminateById(data.check_id)
      }
    })
  }, [ws])

  const { step, message } = status

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <Loader step={step} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary text-center mb-10 capitalize">
        {message}
      </h2>
      <div className="flex justify-center">
        <Button onClick={handleCreateNew} className="w-2/12 capitalize">
          {ui('result.createNew')}
        </Button>
      </div>
    </>
  )
}

export default Loading
