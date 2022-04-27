import { History, isError } from '~/app/models/Report'

import { Cell, STATUS } from './Table.types'

export const mapHistoryToTable = (history: History): Array<Cell> => {
  return history.map(({ result, imageUrl = '' }) => {
    const { check_id, path, story, repository, branch = '' } = result
    const baseObj = {
      branch,
      checkId: check_id,
      imageUrl,
      name: {
        story,
        path,
      },
      path,
      repository,
      story,
    }

    if (isError(result)) {
      return {
        ...baseObj,
        duration: 0,
        status: STATUS.FAIL,
      }
    } else {
      const { created_at, completed_at } = result
      return {
        ...baseObj,
        completedAt: completed_at,
        createdAt: created_at,
        duration: (completed_at - created_at) / 60, //scaling because react-slider can't deal with a large number
        status: STATUS.SUCCESS,
      }
    }
  })
}
