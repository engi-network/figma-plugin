import { ChevronLeftIcon } from '@heroicons/react/solid'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Header from '~/app/components/global/Header/Header'
import IconButton from '~/app/components/global/IconButton/IconButton'
import Loader from '~/app/components/modules/Loader/Loader'
import { useAppContext } from '~/app/contexts/App.context'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import dataSource, { store } from '~/app/lib/services/data-source'
import logger from '~/app/lib/utils/logger'
import { ANIMATION_DURATION_MS, Queue } from '~/app/lib/utils/queue'
import { useStore } from '~/app/lib/utils/store'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { MessageData, REPORT_STATUS } from '~/app/models/Report'

import { STEP_MAP_TO_STEPPER, STEP_MESSAGES } from '../Main/Main.types'
import LoadingStepper from './LoadingStepper/LoadingStepper'

export const loadingInitialStatus = {
  step: 0,
  step_count: 8,
  message: STEP_MESSAGES[0],
} as MessageData

const transition = {
  duration: 0.5,
}

function Loading() {
  const navigate = useNavigate()

  const { setGlobalError, numberOfInProgress, findReportById } = useAppContext()
  const lastMessages = useStore(
    store,
    useCallback((state) => state.lastMessages, []),
  )
  const queueRef = useRef<Queue<MessageData>>(new Queue<MessageData>())

  const [searchParams] = useSearchParams()
  const checkId = searchParams.get('checkId') as string
  const report = findReportById(checkId)
  const lastMessage = lastMessages[checkId]
  const initStep = lastMessage ? lastMessage : loadingInitialStatus

  const [status, setStatus] = useState<MessageData>(initStep)

  const handleClickBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    const queue = queueRef.current
    const callbackInLoading = (data: MessageData) => {
      logger.info('Loading screen data:::', data)
      queue.enqueue(data)
    }

    const unsubscribe = dataSource.subscribeToDS(checkId, callbackInLoading)

    return () => {
      unsubscribe()
    }
  }, [checkId])

  useEffect(() => {
    const queue = queueRef.current

    let timeoutId
    const timerId = setInterval(() => {
      if (queue.size() <= 0) {
        return
      }

      const status = queue.dequeue() as MessageData

      setStatus(status)

      if (status.step === status.step_count - 1) {
        timeoutId = setTimeout(() => {
          navigate({
            pathname: ROUTES_MAP[ROUTES.RESULT],
            search: `?${createSearchParams({ checkId })}`,
          })
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

  useEffect(() => {
    if (report && report.status !== REPORT_STATUS.IN_PROGRESS) {
      navigate({ pathname: ROUTES_MAP[ROUTES.HOME] })
    }
  }, [])

  const { step } = status

  return (
    <>
      <Header numberOfProgress={numberOfInProgress} />
      <div className="relative w-full h-full">
        <IconButton
          icon={<ChevronLeftIcon className="w-4 h-4" />}
          onClick={handleClickBack}
          className="text-text-secondary absolute z-20 top-7 left-8"
        >
          {ui('header.back')}
        </IconButton>
        <AnimatePresence initial={false}>
          <motion.div
            key={STEP_MAP_TO_STEPPER[step]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="absolute flex justify-center w-full"
          >
            <Loader step={step} />
          </motion.div>
        </AnimatePresence>
        <AnimatePresence initial={false}>
          <motion.h2
            key={STEP_MAP_TO_STEPPER[step]}
            initial={{ bottom: 0, opacity: 0 }}
            animate={{ bottom: 100, opacity: 1 }}
            exit={{ bottom: 200, opacity: 0 }}
            transition={transition}
            className="text-2xl font-bold text-text-primary text-center mb-10 absolute w-full"
          >
            {STEP_MESSAGES[step]}
          </motion.h2>
        </AnimatePresence>
        <LoadingStepper
          step={STEP_MAP_TO_STEPPER[step]}
          className="absolute top-12 right-8"
        />
      </div>
    </>
  )
}

export default Loading
