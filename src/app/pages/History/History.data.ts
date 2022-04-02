import { Report } from '~/app/models/Report'

export const mockReport: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308f',
  result: {
    MAE: '24587.6 (0.375183)',
  },
}

export const mockError: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308a',
  result: {
    error: {
      aws: 'there is a aws error!',
    },
  },
}

export const mockHistoryData: Array<Report> = [
  mockReport,
  mockError,
  mockReport,
  mockReport,
  mockError,
  mockReport,
  mockReport,
  mockError,
]
