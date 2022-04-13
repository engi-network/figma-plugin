import { Specification } from './Specification'
export interface ErrorReport extends Specification {
  error: {
    aws?: string
    branch?: string
    clone?: string
    commit?: string
    comp?: string
    frame?: string
    install?: string
    storycap?: string
  }
}

/**
 * @TODO format property to camelCase
 */
export interface ReportResult extends Specification {
  MAE: string
  completed_at: string
  created_at: string
}

export interface Report {
  checkId: string
  result: ReportResult | ErrorReport
}

export type History = Array<Report>

export function isError(
  result: ReportResult | ErrorReport,
): result is ErrorReport {
  return (result as ErrorReport).error !== undefined
}

export enum DIFF_TYPE {
  BLUE = 'blue',
  GRAY = 'gray',
}
