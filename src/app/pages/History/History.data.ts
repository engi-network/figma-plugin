/* eslint-disable sort-keys */
import { SelectOption } from '~/app/components/global/Select/Select'
import { randomString } from '~/app/lib/utils/string'
import { DetailedReport, STATUS } from '~/app/models/Report'

export const SORT_BY_OPTIONS: Array<SelectOption> = [
  { value: 'completedAt', name: 'Last updated' },
  { value: 'createdAt', name: 'Created at' },
  { value: 'path', name: 'Alphabetical' },
]

export const mockSuccessReport: DetailedReport = {
  checkId: '634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3',
  originalImageUrl:
    'https://same-story-api-staging.s3.us-west-2.amazonaws.com/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/frames/Button%20With%20Knobs.png',
  result: {
    branch: 'main',
    check_id: '634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3',
    commit: 'b606897faec4ae0983930c2707845e5792a38255',
    component: 'Button',
    github_token: '',
    height: '600',
    path: 'Global/Components',
    repository: 'engi-network/figma-plugin',
    story: 'Button With Knobs',
    width: '800',
    url_screenshot:
      'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/report/__screenshots__/Global/Components/Button/Button%20With%20Knobs.png',
    url_blue_difference:
      'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/report/blue_difference.png',
    url_gray_difference:
      'https://s3.us-west-2.amazonaws.com/same-story-api-staging/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/report/gray_difference.png',
    MAE: '21304.1 (0.32508)',
    created_at: 1653673585.5174792,
    completed_at: 1653673634.1104794,
    code_path: 'src/app/components/global/Button/Button.stories.tsx',
    code_snippet:
      "import { action } from '@storybook/addon-actions'\nimport { boolean, select, text } from '@storybook/addon-knobs'\n\nimport Button from './Button'\n\n",
    name: 'layer name',
  },
  status: STATUS.SUCCESS,
}

export const mockErrorReport: DetailedReport = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308a',
  originalImageUrl:
    'https://same-story-api-staging.s3.us-west-2.amazonaws.com/checks/634cd4fc-bd1f-4dbd-b26d-c8d53d5e51f3/frames/Button%20With%20Knobs.png',
  result: {
    branch: 'feature-1',
    check_id: '293bdbd6-dee7-4e17-b3db-82765db6308a',
    commit: randomString(15),
    component: 'Button',
    github_token: '',
    error: {
      aws: 'there is a aws error!',
    },
    height: '100',
    MAE: '24587.6 (0.375183)',
    path: 'Global/Component',
    repository: 'repo1',
    story: 'story1',
    width: '100',
    name: 'layer name',
  },
  status: STATUS.FAIL,
}

export const mockInProgressReport: DetailedReport = {
  checkId: '293bdbd6-dee7-4e17-b3db-82765db6308a',
  result: {
    branch: 'staging',
    check_id: '293bdbd6-dee7-4e17-b3db-82765db6308a',
    commit: randomString(5),
    component: 'component' + randomString(2),
    height: '100',
    MAE: '24587.6 (0.375183)',
    path: 'Global/Component',
    repository: 'repo1',
    story: 'story1',
    width: '100',
    name: 'layer name',
  },
  status: STATUS.IN_PROGRESS,
}

export const mockHistoryData: Array<DetailedReport> = [
  mockSuccessReport,
  mockErrorReport,
]
