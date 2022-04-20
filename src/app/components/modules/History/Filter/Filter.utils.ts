import {
  FilterValues,
  mapFilterToAccessor,
  TableFilterItem,
} from './Filter.data'

export const mapFilterFormToTableFilter = (
  filter: FilterValues,
): Array<TableFilterItem> => {
  const tableFilter = Object.entries(filter).map(([key, value]) => ({
    id: mapFilterToAccessor[key],
    value,
  }))

  return tableFilter
}
