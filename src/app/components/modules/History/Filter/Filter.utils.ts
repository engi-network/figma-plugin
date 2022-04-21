import { TB_ACCESSORS } from '~/app/pages/History/History.data'

import {
  FilterValues,
  mapFilterToAccessor,
  TableFilterItem,
} from './Filter.data'

/**
 *
 * @param filter map filter values from Filter component to table accessors
 * @returns object that has keys of table asscessors
 */
export const mapFilterValuesToAccessor = (filter: FilterValues) => ({
  period: [filter.createdBefore, filter.createdAfter],
  duration: filter.duration,
  status: filter.success
    ? filter.fail
      ? ''
      : 'success'
    : filter.fail
    ? 'fail'
    : '',
})

/**
 * @description filter out when value is not suitable
 * @param filter filter values fromo Filter component to be converted to format of filter item object
 * that fits into useFilter in react-table
 * @returns Array<TableFilterItem>
 */

export const mapFilterFormToTableFilter = (
  filter: FilterValues,
): Array<TableFilterItem> => {
  return Object.entries(mapFilterValuesToAccessor(filter)).reduce(
    (prev, [key, value]) => {
      if (!value) {
        return prev
      }

      if (mapFilterToAccessor[key] === TB_ACCESSORS.CREATED_AT) {
        const [start, end] = value
        if (!start || !end) {
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
