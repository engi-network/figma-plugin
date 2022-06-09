import { useEffect, useState } from 'react'

import CodeBlock from '~/app/components/global/CodeBlock/CodeBlock'
import StatusStepper from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'
import SocketManager from '~/app/lib/services/socket-manager'
import { ANIMATION_DURATION_MS, Queue } from '~/app/lib/utils/queue'
import { SocketData, STATUS } from '~/app/models/Report'
import { loadingInitialStatus } from '~/app/pages/Loading/Loading'
import { STEP_MAP_TO_STEPPER } from '~/app/pages/Main/Main.types'

interface Props {
  value: {
    checkId: string
    codeSnippet: string
    status: STATUS
  }
}

const queue = new Queue<SocketData>()
function CellCodeBlock({ value: { codeSnippet, checkId, status } }: Props) {
  const [loadingStatus, setLoadingStatus] =
    useState<SocketData>(loadingInitialStatus)

  const ws = SocketManager.getSocketById(checkId)

  useEffect(() => {
    if (!ws || status !== STATUS.IN_PROGRESS) {
      return
    }

    const { wsHandler } = ws
    const initStep = wsHandler.lastData
      ? wsHandler.lastData
      : loadingInitialStatus

    setLoadingStatus(initStep)

    const callbackInCodeBlock = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as SocketData
      queue.enqueue(data)
    }

    wsHandler.subscribe(callbackInCodeBlock)
    return () => {
      ws.wsHandler.unsubscribe(callbackInCodeBlock)
    }
  }, [ws, status])

  useEffect(() => {
    const timerId = setInterval(() => {
      if (queue.size() <= 0) {
        return
      }

      const status = queue.dequeue() as SocketData
      setLoadingStatus(status)
    }, ANIMATION_DURATION_MS)

    return () => {
      clearInterval(timerId)
    }
  }, [])

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
