import { History, InProgressResult, ReportResult } from '~/app/models/Report'

import { Cell, STATUS } from './Table.types'

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
      case 'error': {
        return {
          ...baseObj,
          duration: 0,
          status: STATUS.FAIL,
        }
      }
      case 'success': {
        const { created_at, completed_at, code_snippet } =
          result as ReportResult
        return {
          ...baseObj,
          code: code_snippet,
          completedAt: completed_at,
          createdAt: created_at,
          duration: (completed_at - created_at) / 60, //scaling because react-slider can't deal with a large number
          status: STATUS.SUCCESS,
        }
      }
      case 'inProgress':
        // const {} = result as InProgressResult
        return {
          ...baseObj,
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
