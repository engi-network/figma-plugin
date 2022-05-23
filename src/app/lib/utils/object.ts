export function makeCompact(obj, filterValues: Array<unknown> = ['']) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => !filterValues.includes(v))
      .map(([k, v]) => [k, v === Object(v) ? makeCompact(v) : v]),
  )
}
