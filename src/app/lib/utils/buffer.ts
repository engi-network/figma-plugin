export const decodeFromBuffer = (
  buffer: ArrayLike<number>,
  decodeMethod = 'utf-8',
): Record<string, string> => {
  try {
    const enc = new TextDecoder(decodeMethod)
    const arr = new Uint8Array(buffer)
    const resultStr = enc.decode(arr)
    return JSON.parse(resultStr)
  } catch (error) {
    return {
      error: 'Parse error',
    }
  }
}
