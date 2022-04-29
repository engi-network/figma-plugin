import { InformationCircleIcon } from '@heroicons/react/outline'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Button from '~/app/components/global/Button/Button'
import Header from '~/app/components/global/Header/Header'
import Code from '~/app/components/modules/Code/Code'
import {
  AnalyzeFormValues,
  FORM_FIELD,
  initialFormValue as initialErrorValues,
} from '~/app/components/modules/Code/Code.data'
import Preview from '~/app/components/modules/Preview/Preview'
import { useAppContext } from '~/app/contexts/App.context'
import useSelectionData from '~/app/hooks/useSelectionData'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import { MAX_RETRY_TIMES } from '~/app/lib/constants/aws'
import {
  CallbackStatus,
  getPresignedUrl,
  pollReportById,
  publishCommandToSns,
  uploadEncodedFrameToS3,
} from '~/app/lib/utils/aws'
import { decodeOriginal, encode } from '~/app/lib/utils/canvas'
import { dispatchData } from '~/app/lib/utils/event'
import { ui } from '~/app/lib/utils/ui-dictionary'
import { Report } from '~/app/models/Report'
import { Specification } from '~/app/models/Specification'
import {
  SAME_STORY_CHECK_INITIAL_SELECTION,
  SAME_STORY_FORM_UPDATE,
  SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
} from '~/plugin/constants'

import LoadingScreen from '../Loading/Loading'
import { DEMENSIONS } from './Main.container.data'

function MainContainer() {
  const navigate = useNavigate()
  const { selectionData, draw } = useSelectionData()
  const { setReport, setHistory } = useAppContext()

  const [values, setValues] = useState<AnalyzeFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formErrors, setFormErrors] =
    useState<AnalyzeFormValues>(initialErrorValues)
  const originCanvasRef = useRef<HTMLCanvasElement>(null)
  const [_, setProgress] = useState(0)
  const [apiError, setApiError] = useState('')
  const [currentTimerId, setTimerId] = useState(-1)

  const { width = 0, height = 0, commit, branch } = selectionData || {}

  const pollCallback = async (status: CallbackStatus, report?: Report) => {
    if (currentTimerId !== status.currentTimerId) {
      setTimerId(status.currentTimerId)
    }

    if (report) {
      const {
        checkId,
        result: { story, component },
      } = report
      const presignedUrl = await getPresignedUrl(story || component, checkId)
      const detailedReport = { ...report, imageUrl: presignedUrl }

      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })
      setHistory((prev) => [...prev, detailedReport])

      if (status.success) {
        console.info('Yay, successfully got report:::', detailedReport)
        setReport(detailedReport)
        setProgress(100)
        navigate(ROUTES_MAP[ROUTES.RESULT])
      } else {
        console.error('Oops, got an error report:::', detailedReport)
        setIsLoading(false)
        setProgress(0)
        setApiError('Something went wrong. Please double check the inputs.')
      }
    } else {
      if (status.retryTimes >= MAX_RETRY_TIMES) {
        console.error('Api time out error!')
        setProgress(0)
        setIsLoading(false)
        setApiError('Something went wrong. Please double check the inputs.')
      } else {
        //calculate the progress based on the retry times
        const progress = Math.floor((status.retryTimes / MAX_RETRY_TIMES) * 100)
        setProgress(progress)
      }
    }
  }

  const handleChange = async (values: AnalyzeFormValues) => {
    setValues(values)
    setFormErrors(initialErrorValues)
    setApiError('')

    dispatchData({
      type: SAME_STORY_FORM_UPDATE,
      data: {
        [FORM_FIELD.REPOSITORY]: values[FORM_FIELD.REPOSITORY],
        [FORM_FIELD.COMMIT]: values[FORM_FIELD.COMMIT],
        [FORM_FIELD.BRANCH]: values[FORM_FIELD.BRANCH],
        [FORM_FIELD.PATH]: values[FORM_FIELD.PATH],
        [FORM_FIELD.GH_TOKEN]: values[FORM_FIELD.GH_TOKEN],
      },
    })
  }

  const formValidate = (values?: AnalyzeFormValues): boolean => {
    if (!values) {
      return false
    }

    if (!values.repository) {
      setFormErrors((prev) => ({
        ...prev,
        repository: 'This field is required!',
      }))
      return false
    }

    if (!values.path) {
      setFormErrors((prev) => ({
        ...prev,
        path: 'This field is required!',
      }))
      return false
    }

    return true
  }

  const handleSubmit = useCallback(async () => {
    setFormErrors(initialErrorValues)
    setApiError('')
    if (!formValidate(values)) {
      return
    }

    if (!originCanvasRef || !originCanvasRef.current || !selectionData) {
      return
    }
    setProgress(0)
    setIsLoading(true)
    try {
      const {
        component,
        repository,
        story,
        path,
        githubToken = '',
      } = values as AnalyzeFormValues
      const checkId: string = uuidv4()
      const message: Specification = {
        branch,
        check_id: checkId,
        commit,
        component,
        github_token: githubToken,
        height: height + '',
        path,
        repository,
        story,
        width: width + '',
      }

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
      await uploadEncodedFrameToS3(story || component, checkId, frame)
      await publishCommandToSns(message)
      await pollReportById(checkId, pollCallback)
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
      component,
      story,
      repository = '',
      branch = '',
      commit = '',
      path = '',
      github_token = '',
    } = selectionData

    setValues({
      branch,
      commit,
      component,
      githubToken: github_token,
      path,
      repository,
      story,
    })
  }, [selectionData])

  useEffect(() => {
    dispatchData({ type: SAME_STORY_CHECK_INITIAL_SELECTION })

    return () => {
      if (currentTimerId > 0) {
        clearInterval(currentTimerId)
      }
    }
  }, [])

  const isDisabled = !!isLoading || !!apiError

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <>
      <Header numberOfProgress={2} />
      <h3 className="text-base text-text-primary font-meidum px-7 pt-4">
        {ui('main.subtitle')}
      </h3>
      <div className="flex px-10 pt-9">
        <section className="w-1/2 flex flex-col items-end">
          <Preview
            draw={draw}
            originalCanvasRef={originCanvasRef}
            label={isDisabled ? undefined : `${width} ✕ ${height}`}
            {...DEMENSIONS.SMALL}
          />
        </section>
        <section className="w-1/2">
          <Code
            onChange={handleChange}
            values={values}
            errors={formErrors}
            isDisabled={isLoading}
          />
        </section>
      </div>
      {apiError && (
        <div className="flex px-12 mt-5 justify-center items-center">
          <span className="text-sm text-secondary-error flex">
            <InformationCircleIcon className="w-5 h-5 text-secondary-error mr-2" />
            {apiError}
          </span>
        </div>
      )}
      <footer className="flex justify-end px-6 my-8">
        <Button onClick={handleSubmit} className="w-3/12" disabled={isLoading}>
          {ui('main.analyze')}
        </Button>
      </footer>
    </>
  )
}

export default MainContainer
