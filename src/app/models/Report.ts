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

export interface ErrorReport extends Specification {
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

export interface Report {
  checkId: string
  result: ReportResult | ErrorReport
}

export type History = Array<DetailedReport>

export function isError(
  result: ReportResult | ErrorReport,
): result is ErrorReport {
  return (result as ErrorReport).error !== undefined
}

export enum DIFF_TYPE {
  BLUE = 'blue',
  GRAY = 'gray',
}

export interface DetailedReport extends Report {
  duration?: number
  imageUrl?: string
}
