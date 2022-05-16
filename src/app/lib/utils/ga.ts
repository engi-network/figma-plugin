import axios, { AxiosResponse } from 'axios'

import config from '../config'

export enum GA_EVENT_NAMES {
  APP_CLOSE = 'app_close',
  APP_OPEN = 'app_open',
  CLICK = 'click',
  COMPLETE = 'complete',
  ERROR = 'error',
  PAGE_VIEW = 'page_view',
  SEARCH = 'search',
  SELECT_LAYER = 'select_layer',
  START_ANALYZE = 'start_ananlyze',
  USER_ENGAGEMENT = 'user_engagement',
}

export interface MeasurementData {
  _et?: string
  _s?: string
  //boolean session start
  _ss?: string
  // // cliient id
  cid: string
  // // document location
  dl?: string
  dp?: string
  dt?: string
  //event name
  en: GA_EVENT_NAMES
  // number of sessions counted for a user
  sct?: string
  // used for whether a session is engaged or not
  // seg=0
  seg?: string
  //current session start TimeStamp
  sid: string
  //screen resolution
  sr?: string
  //user language : en-gb
  ul?: string
  user_id: string
}

export async function sendMeasurementToGa(
  queryParams: MeasurementData,
  payload?: Record<string, string>,
): Promise<AxiosResponse> {
  const query = new URLSearchParams({
    tid: config.GA_MEASUREMENT_ID,
    v: '2',
    ...queryParams,
  }).toString()

  const result = await axios.post(
    `https://google-analytics.com/g/collect?${query}`,
    payload,
  )

  return result
}
