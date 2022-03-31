export interface ErrorReport {
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

export interface ReportResult {
  MAE: string
}

export interface Report {
  checkId: string
  result: ReportResult | ErrorReport
}

export function isError(
  result: ReportResult | ErrorReport,
): result is ErrorReport {
  return (result as ErrorReport).error !== undefined
}
