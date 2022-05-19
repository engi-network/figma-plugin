import { History, ReportResult, STATUS } from '~/app/models/Report'

import { Cell } from './Table.types'

//test placeholder
const placeholder = `const TestCompenent = () => {
  return <div>Test</div>
}
`

export const mapHistoryToTable = (history: History): Array<Cell> => {
  return history.map(({ result, status, imageUrl = '' }) => {
    const {
      check_id,
      path,
      story,
      repository,
      branch = '',
      commit = '',
    } = result
    const baseObj = {
      branch,
      checkId: check_id,
      code: placeholder,
      commit,
      imageUrl,
      name: {
        story,
        path,
      },
      path,
      repository,
      story,
      version: {
        commit,
        branch,
      },
    }

    switch (status) {
      case STATUS.FAIL: {
        return {
          ...baseObj,
          duration: 0,
          status: STATUS.FAIL,
        }
      }
      case STATUS.SUCCESS: {
        const { created_at, completed_at, code_snippet } =
          result as ReportResult
        return {
          ...baseObj,
          code: code_snippet,
          completedAt: completed_at,
          createdAt: created_at,
          //scaling because react-slider can't deal with a large number
          duration: (completed_at - created_at) / 60,
          status: STATUS.SUCCESS,
        }
      }
      case STATUS.IN_PROGRESS:
        return {
          ...baseObj,
          duration: 0,
          status: STATUS.IN_PROGRESS,
        }
      default: {
        return {
          ...baseObj,
          duration: 0,
          status: STATUS.FAIL,
        }
      }
    }
  })
}
