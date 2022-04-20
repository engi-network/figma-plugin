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
      const { created_at, completed_at } = result
      return {
        ...baseObj,
        completedAt: completed_at,
        createdAt: created_at,
        duration: completed_at - created_at,
        status: 'success',
      }
    }
  })
}
