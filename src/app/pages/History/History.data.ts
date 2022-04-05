import { Report } from '~/app/models/Report'

export const mockReport: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308f',
  result: {
    branch: 'branch1',
    commit: 'abc',
    component: 'component1',
    MAE: '24587.6 (0.375183)',
    repository: 'repo1',
    story: 'story1',
  },
}

export const mockError: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308a',
  result: {
    branch: 'branch1',
    commit: 'abc',
    component: 'component1',
    error: {
      aws: 'there is a aws error!',
    },
    MAE: '24587.6 (0.375183)',
    repository: 'repo1',
    story: 'story1',
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
