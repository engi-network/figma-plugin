export const getFilterStateFromQuery = (state: Record<string, string>) => {
  if (!state || !state.filter) {
    return {}
  }

  return Object.entries(state.filter).map(([key, value]) => ({
    [key]: value,
  }))
}
