import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import { QueryState } from '~/app/@types/route'
import Button from '~/app/components/global/Button/Button'
import Loader from '~/app/components/modules/Loader/Loader'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import SocketManager from '~/app/lib/services/socket-manager'
import { Queue } from '~/app/lib/utils/queue'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { SocketData } from '~/app/models/Report'

import { STEP_MESSAGES } from '../Main/Main.types'
import LoadingStepper from './LoadingStepper/LoadingStepper'

const queue = new Queue<SocketData>()
const ANIMATION_DURATION_MS = 3000
const initialStatus = {
  step: 0,
  step_count: 8,
  message: STEP_MESSAGES[0],
} as SocketData

function Loading() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setGlobalError } = useAppContext()
  const [status, setStatus] = useState<SocketData>(initialStatus)
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
    const callback = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as SocketData
      queue.enqueue(data)
    }

    wsHandler.subscribe(callback)

    return () => {
      ws.wsHandler.unsubscribe(callback)
    }
  }, [ws])

  useEffect(() => {
    let timeoutId
    const timerId = setInterval(() => {
      if (queue.size() <= 0) {
        return
      }

      const status = queue.dequeue() as SocketData

      setStatus(status)

      if (status.step === status.step_count - 1) {
        timeoutId = setTimeout(() => {
          navigate(ROUTES_MAP[ROUTES.RESULT])
        }, ANIMATION_DURATION_MS)
        return
      }

      if (status.error) {
        setGlobalError('Something went wrong. Please double check the inputs.')
        timeoutId = setTimeout(() => {
          navigate(ROUTES_MAP[ROUTES.ERROR])
        }, ANIMATION_DURATION_MS)
        return
      }
    }, ANIMATION_DURATION_MS)

    return () => {
      clearInterval(timerId)
      clearTimeout(timeoutId)
    }
  }, [])

  const { step } = status

  return (
    <>
      <div className="flex ml-auto mr-auto mt-20">
        <Loader step={step} />
      </div>
      <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
        {STEP_MESSAGES[step]}
      </h2>
      <div className="flex justify-center">
        <Button onClick={handleCreateNew} className="w-2/12 capitalize">
          {ui('result.createNew')}
        </Button>
      </div>
      <LoadingStepper step={step % 5} className="absolute top-12 right-8" />
    </>
  )
}

export default Loading
