import { Report } from './Report'

export interface CheckItem {
  report: Report | null
  reportPollId: number | undefined
}

export type CheckTable = Record<string, CheckItem>
