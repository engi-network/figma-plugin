import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import useHistoryEvent from '~/app/hooks/useHistoryEvent'
import { createContext } from '~/app/lib/utils/context'
import { DetailedReport, History } from '~/app/models/Report'

import {
  GA_EVENT_NAMES,
  MeasurementData,
  sendMeasurementToGa,
} from '../lib/utils/ga'
import { convertDateToUnix } from '../lib/utils/time'

export interface AppContextProps {
  history: History
  report?: DetailedReport
  setHistory: Dispatch<SetStateAction<DetailedReport[]>>
  setReport: (value: DetailedReport) => void
}

const AppContext = createContext<AppContextProps>()

export function useAppContextSetup(): AppContextProps {
  const [report, setReport] = useState<DetailedReport>()
  const { history, setHistory } = useHistoryEvent()

  useEffect(() => {
    const queryParams: MeasurementData = {
      _s: '1',
      _ss: '1',
      cid: uuidv4(), //wrong cid
      dp: '/',
      dt: 'Home',
      en: GA_EVENT_NAMES.APP_OPEN,
      seg: '0',
      sid: convertDateToUnix(new Date().toString()) + '', //wrong sid
      user_id: uuidv4(),
    }

    sendMeasurementToGa(queryParams)

    return () => {
      // can't capture closing event because it unmounts before sending api call.
      const queryParams: MeasurementData = {
        _s: '0',
        _ss: '0',
        cid: uuidv4(), //wrong cid
        dp: '/',
        dt: 'Home',
        en: GA_EVENT_NAMES.APP_CLOSE,
        seg: '0',
        sid: convertDateToUnix(new Date().toString()) + '', //wrong sid
        user_id: uuidv4(),
      }

      ;(async () => {
        await sendMeasurementToGa(queryParams)
      })()
    }
  }, [])

  return {
    history,
    report,
    setReport,
    setHistory,
  }
}

export function AppContextProvider({ children }: { children: ReactNode }) {
  const value = useAppContextSetup()
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = AppContext.useContext
