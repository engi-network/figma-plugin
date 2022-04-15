import { History, isError } from '~/app/models/Report'

import { Cell } from './Table.types'

export const mapHistoryToTable = (history: History): Array<Cell> => {
  return history.map(({ result }) => {
    const { check_id, path, story, repository } = result
    const baseObj = {
      checkId: check_id,
      path,
      repository,
      story,
    }

    if (isError(result)) {
      return {
        ...baseObj,
        status: 'fail',
      }
    } else {
      return {
        ...baseObj,
        createdAt: result.created_at,
        completedAt: result.completed_at,
        status: 'success',
      }
    }
  })
}
