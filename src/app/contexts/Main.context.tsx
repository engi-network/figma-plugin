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
import GAService, {
  GA_EVENT_NAMES,
  MeasurementData,
} from '~/app/lib/services/ga'
import Sentry, { SENTRY_TRANSACTION } from '~/app/lib/services/sentry'
import { READ_STATE } from '~/app/lib/services/socket'
import { decodeOriginal, encode } from '~/app/lib/utils/canvas'
import { createContext } from '~/app/lib/utils/context'
import { dispatchData } from '~/app/lib/utils/event'
import {
  SAME_STORY_CHECK_INITIAL_SELECTION,
  SAME_STORY_FORM_UPDATE,
} from '~/plugin/constants'

import SocketManager from '../lib/services/socket-manager'
import { PluginSelection } from '../models/PluginSelection'
import { Specification } from '../models/Specification'
import { useUserContext } from './User.context'

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
  selectionData: PluginSelection | undefined
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setStep: Dispatch<SetStateAction<number>>
  setTimerId: Dispatch<SetStateAction<number>>
  step: number
}

const MainContext = createContext<MainContextProps>()

export function useMainContextSetup(): MainContextProps {
  const navigate = useNavigate()
  const { wsCallback } = useAppContext()
  const { userId, sessionId } = useUserContext()

  const { selectionData, draw } = useSelectionData()

  const [values, setValues] = useState<AnalyzeFormValues>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formErrors, setFormErrors] =
    useState<AnalyzeFormValues>(initialErrorValues)
  const originCanvasRef = useRef<HTMLCanvasElement>(null)
  const [step, setStep] = useState(0)
  const [apiError, setApiError] = useState('')
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
    setApiError('')

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
      await AWS.uploadEncodedFrameToS3(story || component, checkId, frame)
      await AWS.publishCommandToSns(message)

      const ws = SocketManager.createWs(checkId)

      const retry = 0

      const timerId = setInterval(() => {
        if (retry > 5) {
          //set error
          console.error('Socket is not ready!====>', ws.isReady())
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
    selectionData,
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
