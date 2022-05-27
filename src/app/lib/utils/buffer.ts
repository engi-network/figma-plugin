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

export const readDataFromStream = (stream: ReadableStream) => {
  const reader = stream.getReader()
  return new ReadableStream({
    start(controller) {
      return pump()
      function pump() {
        return reader.read().then(({ done, value }) => {
          // When no more data needs to be consumed, close the stream
          if (done) {
            controller.close()
            return
          }
          // Enqueue the next data chunk into our target stream
          controller.enqueue(value)
          return pump()
        })
      }
    },
  })
}
