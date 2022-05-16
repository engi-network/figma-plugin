import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import Button from '~/app/components/global/Button/Button'
import Loader from '~/app/components/modules/Loader/Loader'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import SocketManager from '~/app/lib/services/socket-manager'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { SocketData } from '~/app/models/Report'

type QueryState = null | Record<string, string>

/**
 *
 * @TODO check if query has checkId and subscribe to that socket to receive data
 * @returns
 */

function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState<SocketData>({
    step: 0,
    step_count: 8,
    message: 'job started',
  } as SocketData)
  const state = (location.state as QueryState) ?? {}

  const checkId = (state as Record<string, string>).checkId as unknown as string

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const ws = SocketManager.getSocketById(checkId)

  useEffect(() => {
    if (!ws) {
      return
    }

    const { wsHandler } = ws
    wsHandler.subscribe((event: MessageEvent) => {
      setStatus(JSON.parse(event.data))
    })

    return () => {
      // do we really need to terminate maybe used in later in history screen?
    }
  }, [ws])

  console.log('status=========>', status)

  const { step, step_count, message } = status

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <Loader step={step} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary text-center mb-10 uppercase">
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
