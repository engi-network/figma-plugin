import {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import {
  AnalyzeFormValues,
  FORM_FIELD,
  initialFormValue as initialErrorValues,
} from '~/app/components/modules/Code/Code.data'
import { useAppContext } from '~/app/contexts/App.context'
import useSelectionData from '~/app/hooks/useSelectionData'
import { ROUTES, ROUTES_MAP } from '~/app/lib/constants'
import AWS from '~/app/lib/services/aws'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import MySocket, { CustomSocket } from '~/app/lib/services/socket'
import { decodeOriginal, encode } from '~/app/lib/utils/canvas'
import { createContext } from '~/app/lib/utils/context'
import { dispatchData } from '~/app/lib/utils/event'
import { isError, SocketData } from '~/app/models/Report'
import {
  SAME_STORY_CHECK_INITIAL_SELECTION,
  SAME_STORY_FORM_UPDATE,
  SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
} from '~/plugin/constants'

import { PluginSelection } from '../models/PluginSelection'
import { Specification } from '../models/Specification'

export interface MainContextProps {
  apiError: string
  currentTimerId: number
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => Promise<void>
  formErrors: AnalyzeFormValues
  formValues: AnalyzeFormValues | undefined
  handleChange: (values: AnalyzeFormValues) => Promise<void>
  handleSubmit: () => void
  isLoading: boolean
  originCanvasRef: RefObject<HTMLCanvasElement>
  progress: number
  selectionData: PluginSelection | undefined
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setProgress: Dispatch<SetStateAction<number>>
  setTimerId: Dispatch<SetStateAction<number>>
}

const MainContext = createContext<MainContextProps>()

export function useMainContextSetup(): MainContextProps {
  const navigate = useNavigate()
  const { setReport, setHistory } = useAppContext()

  const { selectionData, draw } = useSelectionData()

  const [values, setValues] = useState<AnalyzeFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formErrors, setFormErrors] =
    useState<AnalyzeFormValues>(initialErrorValues)
  const originCanvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)
  const [apiError, setApiError] = useState('')
  const [currentTimerId, setTimerId] = useState(-1)

  const { height = 0, width = 0, commit, branch } = selectionData || {}

  const websocketCallback = async (
    event: MessageEvent,
    mySocket: CustomSocket,
  ) => {
    const { check_id, step, step_count, error, report } = JSON.parse(
      event.data,
    ) as SocketData

    if (!report) {
      console.info('step/step_count', (step / step_count) * 100)
      setProgress(step)
      return
    }

    if (isError(report.result)) {
      const { story, component } = report.result
      const presignedUrl = await AWS.getPresignedUrl(
        story || component,
        check_id,
      )
      const detailedReport = { ...report, imageUrl: presignedUrl }

      dispatchData({
        type: SAME_STORY_HISTORY_CREATE_FROM_UI_TO_PLUGIN,
        data: detailedReport,
      })

      setHistory((prev) => [...prev, detailedReport])
      setReport(detailedReport)
      setProgress(100)
      navigate(ROUTES_MAP[ROUTES.RESULT])
    }

    if (error) {
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.GET_REPORT,
        tagData: { check_id },
      })

      setIsLoading(false)
      setProgress(0)
      setApiError('Something went wrong. Please double check the inputs.')
      mySocket?.terminate(1, 'Error happened!')
    }
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
    const checkId: string = uuidv4()

    try {
      const {
        component,
        repository,
        story,
        path,
        githubToken = '',
      } = values as AnalyzeFormValues
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
      await AWS.uploadEncodedFrameToS3(story || component, checkId, frame)
      await AWS.publishCommandToSns(message)

      MySocket.subscribeToSocket(
        {
          message: 'subscribe',
          check_id: checkId,
        },
        websocketCallback,
      )
    } catch (error) {
      console.error(error)

      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.FORM_SUBMIT,
        tagData: { checkId },
      })
      setIsLoading(false)
    }
  }, [values, selectionData, originCanvasRef])

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

  return {
    apiError,
    currentTimerId,
    draw,
    formErrors,
    formValues: values,
    handleChange,
    handleSubmit,
    isLoading,
    originCanvasRef,
    progress,
    selectionData,
    setIsLoading,
    setProgress,
    setTimerId,
  }
}

export function MainContextProvider({ children }: { children: ReactNode }) {
  const value = useMainContextSetup()
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

export const useMainContext = MainContext.useContext
