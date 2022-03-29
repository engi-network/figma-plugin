export interface ErrorReport {
  aws?: string
  branch?: string
  clone?: string
  commit?: string
  comp?: string
  frame?: string
  install?: string
  storycap?: string
}

export interface Report {
  checkId: string
  result: Record<string, string> | { error: ErrorReport }
}
