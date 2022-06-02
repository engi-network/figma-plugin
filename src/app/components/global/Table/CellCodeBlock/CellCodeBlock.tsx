import { useEffect, useState } from 'react'

import CodeBlock from '~/app/components/global/CodeBlock/CodeBlock'
import StatusStepper from '~/app/components/pages/ResultPage/StatusStepper/StatusStepper'
import SocketManager from '~/app/lib/services/socket-manager'
import { SocketData, STATUS } from '~/app/models/Report'
import { STEP_MAP_TO_STEPPER } from '~/app/pages/Main/Main.types'

interface Props {
  value: {
    checkId: string
    codeSnippet: string
    status: STATUS
  }
}

function CellCodeBlock({ value: { codeSnippet, checkId, status } }: Props) {
  const [activeStep, setActiveStep] = useState(0)

  const ws = SocketManager.getSocketById(checkId)

  useEffect(() => {
    if (!ws || status !== STATUS.IN_PROGRESS) {
      return
    }

    const { wsHandler } = ws
    const initStep = wsHandler.lastData ? wsHandler.lastData.step : 0
    setActiveStep(initStep)

    const callbackInCodeBlock = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as SocketData
      setActiveStep(data.step)
    }

    wsHandler.subscribe(callbackInCodeBlock)
    return () => {
      ws.wsHandler.unsubscribe(callbackInCodeBlock)
    }
  }, [ws, status])

  if (!codeSnippet && status === STATUS.IN_PROGRESS) {
    return (
      <StatusStepper
        activeStep={STEP_MAP_TO_STEPPER[activeStep]}
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
