import { History, isError } from '~/app/models/Report'

import { Cell } from './Table'

export function mapHistoryToTable(history: History): Array<Cell> {
  return history.map(({ result }) => {
    const { component, story } = result

    if (isError(result)) {
      return {
        component,
        story,
        status: 'fail',
      }
    } else {
      return {
        component,
        story,
        status: 'success',
      }
    }
  })
}
