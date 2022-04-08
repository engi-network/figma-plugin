import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Button from '~/app/components/global/Button/Button'
import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import IconButton from '~/app/components/global/IconButton/IconButton'
import { HistoryIcon } from '~/app/components/global/Icons'
import { useAppContext } from '~/app/contexts/App.context'
import { BUTTON_STYLE } from '~/app/lib/constants'
import { fetchCheckReportDifference } from '~/app/lib/utils/aws'
import { decode } from '~/app/lib/utils/canvas'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { isError } from '~/app/models/Report'

function ResultContainer() {
  const navigate = useNavigate()
  const { report } = useAppContext()
  const [buffers, setBuffers] = useState<Array<ArrayBuffer>>([])

  if (!report || !report.checkId || isError(report.result)) {
    navigate('/')
    return null
  }

  const {
    checkId,
    result: { MAE },
  } = report

  const handleClickBack = () => {
    navigate('/')
  }

  const handleViewHistory = () => {
    navigate('/history')
  }

  const handleCreateNew = () => {
    navigate('/')
  }

  const drawBlueCanvas = useCallback(
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!buffers[0]) {
        return
      }

      await decode(canvas, context as CanvasRenderingContext2D, buffers[0])
    },
    [buffers],
  )

  const drawGrayCanvas = useCallback(
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!buffers[1]) {
        return
      }
      await decode(canvas, context as CanvasRenderingContext2D, buffers[1])
    },
    [buffers],
  )

  const fetchSetDiffData = async (checkId) => {
    const promises = [
      fetchCheckReportDifference(checkId, 'blue'),
      fetchCheckReportDifference(checkId, 'gray'),
    ]
    const results = await Promise.all(promises)
    setBuffers(results)
  }

  useEffect(() => {
    if (!checkId) {
      return
    }

    fetchSetDiffData(checkId)
  }, [checkId])

  return (
    <div className="px-10 pt-10">
      <div className="flex justify-between mb-16 relative">
        <IconButton
          icon={<ArrowLeftIcon className="w-4 h-4 text-primary-dark" />}
          buttonStyle={BUTTON_STYLE.OUTLINED}
          onClick={handleClickBack}
        />
        <div className="absolute flex justify-center top-0 left-0 right-0 -z-10">
          <h1 className="text-2xl text-primary-dark w-6/12 text-center font-bold">
            Well done <br />
            <span className="bg-primary-green">{MAE}</span> match!
          </h1>
        </div>
        <div
          role="button"
          tabIndex={-1}
          className="flex justify-end items-center h-fit"
          onClick={handleViewHistory}
        >
          <span className="text-sm text-wf-secondary mr-5">
            {ui('result.viewHistory')}
          </span>
          <IconButton
            icon={<HistoryIcon width={24} height={24} />}
            buttonStyle={BUTTON_STYLE.OUTLINED}
          />
        </div>
      </div>
      <div className="flex mb-8">
        <div className="w-6/12 flex justify-start">
          <Canvas
            id="blue-scale"
            className="mb-4 border-wf-tertiery"
            width={210}
            height={210}
            draw={drawBlueCanvas}
            options={{ contextId: '2d' }}
            label={ui('result.blueScale')}
          />
        </div>
        <div className="w-6/12 flex justify-end">
          <Canvas
            id="blue-scale"
            className="mb-4 border border-wf-tertiery"
            width={210}
            height={210}
            draw={drawGrayCanvas}
            options={{ contextId: '2d' }}
            label={ui('result.grayScale')}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button onClick={handleCreateNew} className="w-5/12 capitalize">
          {ui('result.createNew')}
        </Button>
      </div>
    </div>
  )
}

export default ResultContainer
