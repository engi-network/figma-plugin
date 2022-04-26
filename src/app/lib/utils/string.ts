export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`

export const getPlaceholderImageUrl = ([width, height]: [number, number]) => {
  return `https://via.placeholder.com/${width}x${height}`
}
