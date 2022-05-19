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
export interface SocketData {
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
  code_snippet: string
  completed_at: number
  created_at: number
}

export type InProgressResult = Specification

export interface Report {
  checkId: string
  result: ReportResult | ErrorResult | InProgressResult
  status: 'success' | 'error' | 'inProgress'
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
  imageUrl?: string
}
