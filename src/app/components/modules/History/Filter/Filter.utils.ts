import {
  FilterValues,
  mapFilterToAccessor,
  TableFilterItem,
} from './Filter.data'

export const mapFilterKeys = (filter: FilterValues) => ({
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

export const mapFilterFormToTableFilter = (
  filter: FilterValues,
): Array<TableFilterItem> => {
  const tableFilter = Object.entries(mapFilterKeys(filter)).map(
    ([key, value]) => ({
      id: mapFilterToAccessor[key],
      value,
    }),
  )

  return tableFilter
}
