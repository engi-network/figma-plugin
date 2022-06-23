import { useEffect, useState } from 'react'

import CodeBlock from '~/app/components/global/CodeBlock/CodeBlock'
import StatusStepper from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'
import dataSource from '~/app/lib/services/data-source'
import { ANIMATION_DURATION_MS, Queue } from '~/app/lib/utils/queue'
import { MessageData, STATUS } from '~/app/models/Report'
import { loadingInitialStatus } from '~/app/pages/Loading/Loading'
import { STEP_MAP_TO_STEPPER } from '~/app/pages/Main/Main.types'

interface Props {
  value: {
    checkId: string
    codeSnippet: string
    status: STATUS
  }
}

const queue = new Queue<MessageData>()
function CellCodeBlock({ value: { codeSnippet, checkId, status } }: Props) {
  const lastMessage = dataSource.lastMessages.get(checkId)
  const initStep = lastMessage ? lastMessage : loadingInitialStatus

  const [loadingStatus, setLoadingStatus] = useState<MessageData>(initStep)

  useEffect(() => {
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
    if (status !== STATUS.IN_PROGRESS) {
      return
    }

    const timerId = setInterval(() => {
      if (queue.size() <= 0) {
        return
      }

      const status = queue.dequeue() as MessageData
      setLoadingStatus(status)
    }, ANIMATION_DURATION_MS)

    return () => {
      clearInterval(timerId)
    }
  }, [status])

  const { step } = loadingStatus

  if (!codeSnippet && status === STATUS.IN_PROGRESS) {
    return (
      <StatusStepper
        activeStep={STEP_MAP_TO_STEPPER[step]}
        className="w-full"
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
