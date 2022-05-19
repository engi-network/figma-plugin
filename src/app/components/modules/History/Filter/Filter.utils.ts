import { TB_ACCESSORS } from '~/app/components/global/Table/Table.data'
import { convertDateToUnix } from '~/app/lib/utils/time'
import { STATUS } from '~/app/models/Report'

import {
  FilterValues,
  mapFilterToAccessor,
  TableFilterItem,
} from './Filter.data'

/**
 * @description filter out when value is not suitable
 * @param filter filter values fromo Filter component to be converted to format of filter item object
 * that fits into useFilter in react-table
 * @returns Array<TableFilterItem>
 */

export const mapFilterFormToTableFilter = (
  filter: FilterValues,
): Array<TableFilterItem> => {
  const branchNames = Object.entries(filter.branch).reduce(
    (prev, [key, value]) => {
      if (!value) {
        return prev
      }

      prev.push(key)
      return prev
    },
    [] as Array<string>,
  )

  const preFormattedFilterValues = {
    period: [
      convertDateToUnix(filter.createdBefore),
      convertDateToUnix(filter.createdAfter),
    ],
    duration: filter.duration,
    // @TODO has to change this logic for inprogress
    status: filter.success
      ? filter.fail
        ? ''
        : STATUS.SUCCESS
      : filter.fail
      ? STATUS.FAIL
      : '',
    branch: !!branchNames.length && branchNames,
  }

  return Object.entries(preFormattedFilterValues).reduce(
    (prev, [key, value]) => {
      if (!value) {
        return prev
      }

      if (mapFilterToAccessor[key] === TB_ACCESSORS.CREATED_AT) {
        const [start, end] = value
        if (!start && !end) {
          return prev
        }
      }

      const temp = {
        id: mapFilterToAccessor[key],
        value,
      }

      prev.push(temp)
      return prev
    },
    [] as Array<TableFilterItem>,
  )
}
