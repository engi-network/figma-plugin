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
import AWSService from '~/app/lib/services/aws'
import GAService, {
  GA_EVENT_NAMES,
  MeasurementData,
} from '~/app/lib/services/ga'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { READ_STATE } from '~/app/lib/services/socket'
import SocketManager from '~/app/lib/services/socket-manager'
import { decodeOriginal, encode } from '~/app/lib/utils/canvas'
import { createContext } from '~/app/lib/utils/context'
import { dispatchData } from '~/app/lib/utils/event'
import { PluginSelection } from '~/app/models/PluginSelection'
import { DetailedReport, STATUS } from '~/app/models/Report'
import { Specification } from '~/app/models/Specification'
import {
  SAME_STORY_CHECK_INITIAL_SELECTION,
  SAME_STORY_FORM_UPDATE,
} from '~/plugin/constants'

import { useUserContext } from './User.context'

export interface MainContextProps {
  currentTimerId: number
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => Promise<void>
  formErrors: AnalyzeFormValues
  formValues: AnalyzeFormValues | undefined
  globalError: string
  handleChange: (values: AnalyzeFormValues) => Promise<void>
  handleSubmit: () => void
  isLoading: boolean
  originCanvasRef: RefObject<HTMLCanvasElement>
  selectionData: PluginSelection | undefined
  setGlobalError: (value: string) => void
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setStep: Dispatch<SetStateAction<number>>
  setTimerId: Dispatch<SetStateAction<number>>
  step: number
}

const MainContext = createContext<MainContextProps>()

export function useMainContextSetup(): MainContextProps {
  const navigate = useNavigate()
  const { wsCallback, setGlobalError, globalError, setHistory } =
    useAppContext()
  const { userId, sessionId } = useUserContext()

  const { selectionData, draw } = useSelectionData()

  const [values, setValues] = useState<AnalyzeFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formErrors, setFormErrors] =
    useState<AnalyzeFormValues>(initialErrorValues)
  const originCanvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState(0)
  const [currentTimerId, setTimerId] = useState(-1)

  const { height = 0, width = 0, commit, branch } = selectionData || {}

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
    setGlobalError('')

    if (!formValidate(values)) {
      return
    }

    if (!originCanvasRef || !originCanvasRef.current || !selectionData) {
      return
    }

    setStep(0)
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
      await AWSService.uploadEncodedFrameToS3(
        story || component,
        checkId,
        frame,
      )
      const imageUrl = await AWSService.getPresignedUrl(
        story || component,
        checkId,
      )
      await AWSService.publishCommandToSns(message)

      const reportInProgress = {
        status: STATUS.IN_PROGRESS,
        checkId,
        imageUrl,
        result: {
          ...message,
        },
      } as DetailedReport

      setHistory((prev) => [...prev, reportInProgress])
      const ws = SocketManager.createWs(checkId)

      let retry = 0
      const timerId = setInterval(() => {
        if (retry > 5) {
          clearInterval(timerId)
        }

        if (ws.isReady() === READ_STATE.OPEN) {
          ws.sendMessage({
            message: 'subscribe',
            check_id: checkId,
          })

          ws.subscribe(wsCallback)
          clearInterval(timerId)

          navigate(ROUTES_MAP[ROUTES.LOADING], {
            state: { checkId },
          })
        }
        retry += 1
      }, 1000)

      const queryParams: MeasurementData = {
        _ss: '0',
        cid: userId,
        dp: '/',
        dt: 'Home',
        en: GA_EVENT_NAMES.START_ANALYZE,
        seg: '0',
        sid: sessionId,
        user_id: userId,
      }
      GAService.sendMeasurementData(queryParams)
    } catch (error) {
      console.error(error)
      Sentry.sendReport({
        error,
        transactionName: SENTRY_TRANSACTION.FORM_SUBMIT,
        tagData: { checkId },
      })

      const queryParams: MeasurementData = {
        _ss: '0',
        cid: userId,
        dp: '/',
        dt: 'Home',
        en: GA_EVENT_NAMES.ERROR,
        seg: '0',
        sid: sessionId,
        user_id: userId,
      }
      GAService.sendMeasurementData(queryParams)
      setIsLoading(false)
    }
  }, [values, selectionData, originCanvasRef])

  const handleChange = async (values: AnalyzeFormValues) => {
    setValues(values)
    setFormErrors(initialErrorValues)
    setGlobalError('')

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
    currentTimerId,
    draw,
    formErrors,
    formValues: values,
    globalError,
    handleChange,
    handleSubmit,
    isLoading,
    originCanvasRef,
    selectionData,
    setGlobalError,
    setIsLoading,
    setStep,
    setTimerId,
    step,
  }
}

export function MainContextProvider({ children }: { children: ReactNode }) {
  const value = useMainContextSetup()
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>
}

export const useMainContext = MainContext.useContext
