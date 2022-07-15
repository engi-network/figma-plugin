import { Specification } from './Specification'

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

export interface ErrorResult extends Specification {
  created_at: number
  error: ErrorData
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
  url_gray_difference: string
  url_screenshot: string
}

export interface InProgressResult extends Specification {
  created_at: number
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

export interface Report {
  checkId: string
  result: ReportResult | ErrorResult | InProgressResult
  status: REPORT_STATUS
}

export type History = Array<DetailedReport>

export function isError(
  result: ReportResult | ErrorResult,
): result is ErrorResult {
  return (result as ErrorResult).error !== undefined
}

export enum DIFF_TYPE {
  BLUE = 'blue',
  GRAY = 'gray',
}

export interface DetailedReport extends Report {
  duration?: number
  originalImageUrl?: string
}
