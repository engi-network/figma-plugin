import { ChevronLeftIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import { QueryState } from '~/app/@types/route'
import Header from '~/app/components/global/Header/Header'
import IconButton from '~/app/components/global/IconButton/IconButton'
import Loader from '~/app/components/modules/Loader/Loader'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import SocketManager from '~/app/lib/services/socket-manager'
import { Queue } from '~/app/lib/utils/queue'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { SocketData } from '~/app/models/Report'

import { STEP_MAP_TO_STEPPER, STEP_MESSAGES } from '../Main/Main.types'
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

  const handleClickBack = () => {
    navigate(-1)
  }

  const ws = SocketManager.getSocketById(checkId)

  useEffect(() => {
    if (!ws) {
      return
    }

    const { wsHandler } = ws

    // this ws callback for handling things in foreground in loading state
    const callbackInLoading = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as SocketData
      queue.enqueue(data)
    }

    wsHandler.subscribe(callbackInLoading)

    return () => {
      ws.wsHandler.unsubscribe(callbackInLoading)
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
      <Header />
      <div className="relative">
        <IconButton
          icon={<ChevronLeftIcon className="w-4 h-4" />}
          onClick={handleClickBack}
          className="text-text-secondary absolute z-20 top-7 left-8"
        >
          {ui('header.back')}
        </IconButton>
        <div className="flex justify-center">
          <Loader step={step} />
        </div>
        <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
          {STEP_MESSAGES[step]}
        </h2>
        <LoadingStepper
          step={STEP_MAP_TO_STEPPER[step]}
          className="absolute top-12 right-8"
        />
      </div>
    </>
  )
}

export default Loading
