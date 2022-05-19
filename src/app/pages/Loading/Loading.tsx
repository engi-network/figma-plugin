import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import { QueryState } from '~/app/@types/route'
import Button from '~/app/components/global/Button/Button'
import Loader from '~/app/components/modules/Loader/Loader'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import SocketManager from '~/app/lib/services/socket-manager'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { SocketData } from '~/app/models/Report'

function Loading() {
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

  useEffect(() => {
    if (!ws) {
      return
    }

    const { wsHandler } = ws

    // this ws callback for handling things in foreground in loading state
    wsHandler.subscribe((event: MessageEvent) => {
      const data = JSON.parse(event.data) as SocketData
      setStatus(data)
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
