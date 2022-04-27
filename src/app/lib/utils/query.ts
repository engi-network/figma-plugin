import { QueryState } from '~/app/@types/route'

export const getFilterStateFromQuery = (state: QueryState) => {
  if (!state || !state.filter) {
    return {}
  }

  return Object.entries(state.filter).map(([key, value]) => ({
    [key]: value,
  }))
}
