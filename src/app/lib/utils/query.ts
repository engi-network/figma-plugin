export const getFilterStateFromQuery = (state: Record<string, string>) => {
  if (!state || !state.filter) {
    return {}
  }

  return Object.entries(state.filter).map(([key, value]) => ({
    [key]: value,
  }))
}

export const buildQueryString = (params: Record<string, string>): string => {
  return Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&')
}
