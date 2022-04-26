import { QueryState } from '~/app/@types/route'

export const getFilterStateFromQuery = (state: QueryState) => {
  return Object.entries(state.filter).map(([key, value]) => ({
    [key]: value,
  }))
}
