import { useCallback, useEffect, useRef, useState } from 'react'

import CodeBlock from '~/app/components/global/CodeBlock/CodeBlock'
import StatusStepper from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'
import dataSource, { store } from '~/app/lib/services/data-source'
import { ANIMATION_DURATION_MS, Queue } from '~/app/lib/utils/queue'
import { useStore } from '~/app/lib/utils/store'
import { MessageData, STATUS } from '~/app/models/Report'
import { loadingInitialStatus } from '~/app/pages/Loading/Loading'
import { STEP_MAP_TO_STEPPER, STEP_MESSAGES } from '~/app/pages/Main/Main.types'

interface Props {
  value: {
    checkId: string
    codeSnippet: string
    name: string
    originalImageUrl: string
    status: STATUS
  }
}

function CellCodeBlock({
  value: { codeSnippet, checkId, status, originalImageUrl, name: layerName },
}: Props) {
  const queueRef = useRef<Queue<MessageData>>(new Queue<MessageData>())
  const lastMessages = useStore(
    store,
    useCallback((state) => state.lastMessages, []),
  )
  const initStep =
    lastMessages && lastMessages[checkId]
      ? lastMessages[checkId]
      : loadingInitialStatus
  const [stepStatus, setStepStatus] = useState<MessageData>(initStep)

  useEffect(() => {
    const queue = queueRef.current

    if (status !== STATUS.IN_PROGRESS) {
      return
    }

    const callbackInCodeBlock = (data) => {
      queue.enqueue(data)
    }

    const unsubscribe = dataSource.subscribeToDS(checkId, callbackInCodeBlock)

    return () => {
      unsubscribe()
    }
  }, [checkId, status])

  useEffect(() => {
    const queue = queueRef.current

    if (status !== STATUS.IN_PROGRESS) {
      return
    }

    const timerId = setInterval(() => {
      if (queue.size() <= 0) {
        return
      }

      const status = queue.dequeue() as MessageData
      setStepStatus(status)
    }, ANIMATION_DURATION_MS)

    return () => {
      clearInterval(timerId)
    }
  }, [status])

  const { step, results = {} } = stepStatus

  if (!codeSnippet && status === STATUS.IN_PROGRESS) {
    return (
      <StatusStepper
        activeStep={STEP_MAP_TO_STEPPER[step]}
        className="w-full"
        data={results}
        originalImageUrl={originalImageUrl}
        stepMessage={STEP_MESSAGES[step]}
        layerName={layerName}
      />
    )
  }

  return (
    <CodeBlock
      codeString={codeSnippet || 'No code snippet available'}
      className="h-full w-full"
    />
  )
}

export default CellCodeBlock
