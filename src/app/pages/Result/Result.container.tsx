import { ArrowLeftIcon } from '@heroicons/react/solid'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import Button from '~/app/components/global/Button/Button'
import Canvas from '~/app/components/global/Canvas/CanvasContainer'
import IconButton from '~/app/components/global/IconButton/IconButton'
import { HistoryIcon } from '~/app/components/global/Icons'
import { useAppContext } from '~/app/contexts/App.context'
import {
  BUTTON_STYLE,
  DIRECTION,
  ROUTES,
  ROUTES_MAP,
} from '~/app/lib/constants'
import { fetchReportDifferenceById } from '~/app/lib/utils/aws'
import { decode } from '~/app/lib/utils/canvas'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { DIFF_TYPE, isError } from '~/app/models/Report'

function ResultContainer() {
  const navigate = useNavigate()
  const { report } = useAppContext()
  const [buffers, setBuffers] = useState<Array<ArrayBuffer>>([])

  if (!report || !report.checkId || isError(report.result)) {
    navigate(ROUTES_MAP[ROUTES.HOME])
    return null
  }

  const { checkId } = report

  const handleClickBack = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
  }

  const handleViewHistory = () => {
    navigate(ROUTES_MAP[ROUTES.HISTORY])
  }

  const handleCreateNew = () => {
    navigate(ROUTES_MAP[ROUTES.HOME])
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
      fetchReportDifferenceById(checkId, DIFF_TYPE.BLUE),
      fetchReportDifferenceById(checkId, DIFF_TYPE.GRAY),
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
            {ui('result.wellDone')} <br />
            {ui('result.its')}
            <span className="bg-primary-green">{ui('result.same')}</span>
          </h1>
        </div>
        <div
          role="button"
          tabIndex={-1}
          className="flex justify-end items-center h-fit"
          onClick={handleViewHistory}
        >
          <IconButton
            className="text-wf-secondary text-sm"
            icon={<HistoryIcon width={24} height={24} />}
            buttonStyle={BUTTON_STYLE.OUTLINED}
            iconPosition={DIRECTION.RIGHT}
          >
            {ui('result.viewHistory')}
          </IconButton>
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
