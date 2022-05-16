import { ReactNode, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import GAService, {
  GA_EVENT_NAMES,
  MeasurementData,
} from '~/app/lib/services/ga'
import { createContext } from '~/app/lib/utils/context'
import { convertDateToUnix } from '~/app/lib/utils/time'

export interface UserContextProps {
  sessionId: string
  userId: string
}

const UserContext = createContext<UserContextProps>()

export function useUserContextSetup(): UserContextProps {
  const [userId, setUserId] = useState('')
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    const userId = uuidv4()
    const sessionId = convertDateToUnix(new Date().toString()) + ''

    setUserId(userId)
    setSessionId(sessionId)

    const queryParams: MeasurementData = {
      _ss: '1',
      cid: userId,
      dp: '/',
      dt: 'Home',
      en: GA_EVENT_NAMES.APP_OPEN,
      seg: '0',
      sid: sessionId,
      user_id: userId,
    }

    GAService.sendMeasurementData(queryParams)
  }, [])

  return {
    userId,
    sessionId,
  }
}

export function UserContextProvider({ children }: { children: ReactNode }) {
  const value = useUserContextSetup()
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUserContext = UserContext.useContext
