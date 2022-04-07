import { InformationCircleIcon } from '@heroicons/react/outline'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import HistoryIcon from '~/app/assets/icons/common/history.svg'
import Button from '~/app/components/global/Button/Button'
import IconButton from '~/app/components/global/IconButton/IconButton'
import ProgressBar from '~/app/components/global/ProgressBar/ProgressBar'
import Code, { AnalyzeFormValues } from '~/app/components/modules/Code/Code'
import Preview from '~/app/components/modules/Preview/Preview'
import { useAppContext } from '~/app/contexts/App.context'
import useSelectionData from '~/app/hooks/useSelectionData'
import { MAX_RETRY_TIMES } from '~/app/lib/constants/aws'
import {
  pollCheckReport,
  startEcsCheck,
  uploadCheckSpecificationToS3,
  uploadEncodedFrameToS3,
} from '~/app/lib/utils/aws'
import { decodeOriginal, encode } from '~/app/lib/utils/canvas'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { Message } from '~/app/models/Message'
import { Report } from '~/app/models/Report'
import {
  LOCAL_STORAGE_KEY,
  SAME_STORY_FORM_UPDATE,
  SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
} from '~/plugin/constants'

import styles from './Main.container.styles'
import { MESSAGES } from './Main.types'

export const DEMENSIONS = {
  SMALL: {
    width: 300,
    height: 240,
  },
  BIG: {
    width: 300,
    height: 240,
  },
}

function MainContainer() {
  const navigate = useNavigate()
  const { selectionData, draw } = useSelectionData()
  const [values, setValues] = useState<AnalyzeFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<AnalyzeFormValues>()
  const originCanvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const { setReport, setHistory } = useAppContext()

  const { width = 0, height = 0, commit, branch } = selectionData || {}

  const pollCallback = (
    status: {
      retryTimes: number
      success: boolean
    },
    report?: Report,
  ) => {
    if (report) {
      console.info('successfully got report:::', report)
      parent.postMessage(
        {
          pluginMessage: {
            type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
            data: {
              report,
            },
          },
        },
        '*',
      )
      setHistory((prev) => [...prev, report])

      if (status.success) {
        setReport(report)
        setProgress(100)
        navigate('/result')
      } else {
        console.info('error report======>', report)
        setIsLoading(false)
        setProgress(0)
      }
    } else {
      if (status.retryTimes > MAX_RETRY_TIMES) {
        //set ui error in turn
        setProgress(0)
        setIsLoading(false)
      } else {
        //calculate the progress based on the retry times
        const progress = Math.floor((status.retryTimes / MAX_RETRY_TIMES) * 100)
        setProgress(progress)
      }
    }
  }

  const handleChange = async (values: AnalyzeFormValues) => {
    setValues(values)
    setErrors(undefined)

    if (values) {
      parent.postMessage(
        {
          pluginMessage: {
            type: SAME_STORY_FORM_UPDATE,
            data: {
              [LOCAL_STORAGE_KEY.REPOSITORY]: values.repository,
            },
          },
        },
        '*',
      )
    }
  }

  const handleSubmit = useCallback(async () => {
    if (!values || !values.repository) {
      setErrors({
        branch: '',
        commit: '',
        component: '',
        repository: 'This field is required!',
        story: '',
      })
      return
    }

    if (!originCanvasRef || !originCanvasRef.current || !selectionData) {
      return
    }
    setProgress(0)
    setIsLoading(true)
    try {
      const { component, repository, story } = values
      const checkId: string = uuidv4()
      const message: Message = {
        branch,
        check_id: checkId,
        commit,
        component,
        height: height + '',
        repository,
        story,
        width: width + '',
      }

      const name = component + '-' + story
      const context = originCanvasRef.current.getContext(
        '2d',
      ) as CanvasRenderingContext2D

      const copyRef = originCanvasRef.current
      const imageData = await decodeOriginal(
        originCanvasRef.current,
        context,
        selectionData.frame,
      )

      const frame = await encode(copyRef, context, imageData)

      await uploadEncodedFrameToS3(name, checkId, frame)
      await uploadCheckSpecificationToS3(message)
      await startEcsCheck(message)
      await pollCheckReport(checkId, pollCallback)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }, [values, selectionData, originCanvasRef])

  useEffect(() => {
    if (!selectionData) {
      return
    }

    const {
      name = '',
      repository = '',
      branch = '',
      commit = '',
    } = selectionData
    const [component, story = ''] = name.split('-')

    setValues({
      branch,
      commit,
      component,
      repository,
      story,
    })
  }, [selectionData])

  const handleViewHistory = () => {
    navigate('/history')
  }

  if (isLoading) {
    const step = Math.floor(progress / 20)
    return (
      <div className="flex flex-1 justify-center items-center">
        <ProgressBar
          percentage={progress}
          label={MESSAGES[step]}
          className={'w-8/12'}
        />
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-between border-y border-text-secondary px-7 py-5">
        <h1 className="font-base text-black font-medium">{ui('main.title')}</h1>
        <div className="flex justify-center items-center">
          <IconButton
            className="text-wf-secondary"
            icon={
              <img
                src={HistoryIcon}
                width={24}
                height={24}
                css={styles.historyIcon}
              />
            }
            onClick={handleViewHistory}
          >
            {ui('main.history')}
          </IconButton>
        </div>
      </div>
      <div className="flex mb-10 p-10">
        <section className="w-1/2 flex flex-col items-end">
          <Preview
            draw={draw}
            originalCanvasRef={originCanvasRef}
            label={`${width} ✕ ${height}`}
            {...DEMENSIONS.SMALL}
          />
        </section>
        <section className="w-1/2">
          <Code onChange={handleChange} values={values} errors={errors} />
        </section>
      </div>
      <footer className="flex justify-between px-6 mb-10">
        <a href="#" className="flex items-center">
          <span className="text-sm text-[#B3B3B3] flex">
            <InformationCircleIcon className="w-5 h-5 text-[#B3B3B3] mr-3" />
            {ui('header.learnMore')}
          </span>
        </a>
        <Button
          primary
          onClick={handleSubmit}
          className="w-3/12"
          backgroundColor="#18A0FB"
        >
          {ui('main.analyze')}
        </Button>
      </footer>
    </>
  )
}

export default MainContainer
