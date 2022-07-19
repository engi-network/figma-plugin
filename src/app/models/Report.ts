import { Specification } from './Specification'

export enum DIFF_TYPE {
  BLUE = 'blue',
  GRAY = 'gray',
}

export enum FETCH_STATUS {
  FAIL = 'fetch_fail',
  SUCCESS = 'fetch_success',
}

export enum REPORT_STATUS {
  ERROR = 'report_error',
  FAIL = 'report_fail',
  IN_PROGRESS = 'report_in_progress',
  SUCCESS = 'report_success',
}

interface ErrorData {
  aws?: string
  branch?: string
  clone?: string
  commit?: string
  comp?: string
  frame?: string
  install?: string
  storycap?: string
}

export interface MessageResult {
  MAE?: string
  code_paths?: Array<string>
  code_size?: number
  code_snippets?: Array<string>
  completed_at?: number
  created_at?: number
  url_blue_difference?: string
  url_check_frame?: string
  url_gray_difference?: string
  url_screenshot?: string
}
export interface MessageData {
  check_id: string
  error?: ErrorData
  message: string
  results?: MessageResult
  step: number
  step_count: number
}

export interface FailedResult extends Specification {
  created_at: number
  error: ErrorData
  results?: MessageResult
}

/**
 * @TODO format property to camelCase
 */
export interface ReportResult extends Specification {
  MAE: string
  code_paths: Array<string>
  code_size: number
  code_snippets: Array<string>
  completed_at: number
  created_at: number
  url_blue_difference: string
  url_check_frame: string
  url_gray_difference: string
  url_screenshot: string
}

export interface InProgressResult extends Specification {
  created_at: number
}

export interface Report {
  checkId: string
  result: ReportResult | FailedResult | InProgressResult
  status: REPORT_STATUS
}

export function hasFailed(
  result: ReportResult | FailedResult,
): result is FailedResult {
  return (result as FailedResult).error !== undefined
}

export function isInProgress(
  result: ReportResult | FailedResult | InProgressResult,
): result is InProgressResult {
  return (result as InProgressResult).created_at !== undefined
}

export type History = Array<Report>
