import { SelectOption } from '~/app/components/global/Select/Select'
import { randomString } from '~/app/lib/utils/string'
import { Report } from '~/app/models/Report'

export const sortByOptions: Array<SelectOption> = [
  { value: 'completedAt', name: 'Last updated' },
  { value: 'createdAt', name: 'Newest' },
  { value: 'path', name: 'Alphabetical' },
]

export const filterByOptions: Array<SelectOption> = [
  { value: 'component', name: 'Component' },
  { value: 'story', name: 'Story' },
  { value: 'status', name: 'Status' },
  { value: 'repository', name: 'Repository' },
]

export const mockReport: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308f',
  result: {
    branch: randomString(5),
    check_id: '293bdbd6-dee7-4e17-b3db-82765db6308f',
    commit: randomString(5),
    completed_at: 124234234,
    component: 'component' + randomString(2),
    created_at: 12312312,
    height: '100',
    MAE: '24587.6 (0.375183)',
    path: 'Global/Components',
    repository: 'repo1',
    story: 'story1',
    width: '100',
  },
}

export const mockError: Report = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308a',
  result: {
    branch: randomString(5),
    check_id: '293bdbd6-dee7-4e17-b3db-82765db6308a',
    commit: randomString(5),
    component: 'component' + randomString(2),
    error: {
      aws: 'there is a aws error!',
    },
    height: '100',
    MAE: '24587.6 (0.375183)',
    path: 'Global/Component',
    repository: 'repo1',
    story: 'story1',
    width: '100',
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
