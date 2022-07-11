export const randomString = (maxLength?: number): string =>
  `_${Math.random().toString(36).substring(2, maxLength)}`

export const getPlaceholderImageUrl = ([width, height]: [number, number]) => {
  return `https://via.placeholder.com/${width}x${height}`
}

export const formatFileSize = (sizeInBytes: number): string => {
  const sizeInKB = +(sizeInBytes / 2 ** 10).toFixed(2)
  if (Math.floor(sizeInKB) >= 1 && Math.floor(sizeInKB) < 2 ** 10) {
    return sizeInKB + 'kb'
  }

  const sizeInMB = +(sizeInBytes / 2 ** 20).toFixed(2)
  if (Math.floor(sizeInMB) >= 1 && Math.floor(sizeInMB) < 2 ** 20) {
    return sizeInMB + 'mb'
  }

  const sizeInGB = +(sizeInBytes / 2 ** 30).toFixed(2)
  if (Math.floor(sizeInGB) >= 1 && Math.floor(sizeInGB) < 2 ** 30) {
    return sizeInGB + 'gb'
  }

  return sizeInBytes + 'bytes'
}
