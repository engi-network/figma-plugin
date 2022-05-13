import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import Button from '~/app/components/global/Button/Button'
import Loader from '~/app/components/modules/Loader/Loader'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import SocketManager from '~/app/lib/services/socket-manager'
import { ui } from '~/app/lib/utils/ui-dictionary'

import { STEP_MESSAGES } from '../Main/Main.types'

type QueryState = null | Record<string, string>

/**
 *
 * @TODO check if query has checkId and subscribe to that socket to receive data
 * @returns
 */

function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
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
    wsHandler.subscribeToSocket({}, () => {})

    return () => {
      // do we really need to terminate maybe used in later in history screen?
      wsHandler.terminate(0, 'success')
    }
  }, [ws])

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <Loader step={0} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
        {STEP_MESSAGES[0]}
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
