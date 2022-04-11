import { History, isError } from '~/app/models/Report'

import { Cell } from './Table.types'

export const mapHistoryToTable = (history: History): Array<Cell> => {
  return history.map(({ checkId, result }) => {
    const { component, story, repository } = result
    const baseObj = {
      checkId,
      component,
      story,
      repository,
    }

    if (isError(result)) {
      return {
        ...baseObj,
        status: 'fail',
      }
    } else {
      return {
        ...baseObj,
        status: 'success',
      }
    }
  })
}
