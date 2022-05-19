import { FilterValues } from '~/app/components/modules/History/Filter/Filter.data'

export interface FilterQueryState {
  filter: FilterValues
}

export type QueryState = null | Record<string, string>
