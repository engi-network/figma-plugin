import axios from 'axios'

import config from '../config'

export enum GA_EVENT_NAMES {
  CLICK = 'click',
  PAGE_VIEW = 'page_view',
  USER_ENGAGEMENT = 'user_engagement',
  VIEW_SEARCH_RESULTS = 'view_search_results',
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
}

export async function sendMeasurementToGa(
  queryParams: MeasurementData,
  payload?: Record<string, string>,
) {
  const query = new URLSearchParams({
    tid: config.GA_MEASUREMENT_ID,
    v: '2',
    ...queryParams,
  }).toString()

  const result = await axios.post(
    `https://google-analytics.com/g/collect?${query}`,
    payload,
  )

  console.info('result====>', result)
}
