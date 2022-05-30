export function makeCompact(obj, filterValues: Array<unknown> = ['']) {
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => !filterValues.includes(v))
      .map(([k, v]) => [k, v === Object(v) ? makeCompact(v) : v]),
  )
}

export function replaceItemInArray<T>(
  arr: Array<T>,
  property: string,
  id: string,
  item: T,
): Array<T> {
  const clonedArray: Array<T> = JSON.parse(JSON.stringify(arr))
  const itemIndex = clonedArray.findIndex((item) => item[property] === id)
  if (itemIndex !== -1) {
    clonedArray[itemIndex] = item
  }

  return clonedArray
}
