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
export interface MessageData {
  check_id: string
  error?: ErrorData
  message: string
  step: number
  step_count: number
}

export interface ErrorResult extends Specification {
  error: ErrorData
}

/**
 * @TODO format property to camelCase
 */
export interface ReportResult extends Specification {
  MAE: string
  code_path: string
  code_snippet: string
  completed_at: number
  created_at: number
  url_blue_difference: string
  url_gray_difference: string
  url_screenshot: string
}

export type InProgressResult = Specification

export enum STATUS {
  FAIL = 'fail',
  IN_PROGRESS = 'inProgress',
  SUCCESS = 'success',
}

export interface Report {
  checkId: string
  result: ReportResult | ErrorResult | InProgressResult
  status: STATUS
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
