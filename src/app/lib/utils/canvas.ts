export async function encode(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  imageData: ImageData,
): Promise<Uint8Array> {
  context.putImageData(imageData, 0, 0)

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      const reader = new FileReader()
      reader.onload = () =>
        resolve(new Uint8Array(reader.result as ArrayBuffer))
      reader.onerror = () => reject(new Error('Could not read from blob'))
      reader.readAsArrayBuffer(blob as Blob)
    })
  })
}

export async function drawImage(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  data: BlobPart | string,
): Promise<void> {
  const dpr = window.devicePixelRatio || 1

  const url =
    typeof data === 'string' ? data : URL.createObjectURL(new Blob([data]))

  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })

  const horizontalRatio = canvas.width / image.width / dpr
  const verticalRatio = canvas.height / image.height / dpr

  const ratio = Math.min(
    horizontalRatio < 1 ? horizontalRatio : 1,
    verticalRatio < 1 ? verticalRatio : 1,
  )

  const xCenterOffset = (canvas.width / dpr - image.width * ratio) / 2
  const yCenterOffset = (canvas.height / dpr - image.height * ratio) / 2

  context.clearRect(0, 0, canvas.width, canvas.height)

  context.drawImage(
    image,
    0,
    0,
    image.width,
    image.height,
    xCenterOffset,
    yCenterOffset,
    image.width * ratio,
    image.height * ratio,
  )
}

export async function decodeOriginal(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  frame: BlobPart,
): Promise<ImageData> {
  const url = URL.createObjectURL(new Blob([frame]))

  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const img = new Image()

    img.onload = () => resolve(img)
    img.onerror = () => reject()

    img.src = url
  })

  context.clearRect(0, 0, canvas.width, canvas.height)

  canvas.width = image.width
  canvas.height = image.height

  context.drawImage(image, 0, 0)

  const imageData = context.getImageData(0, 0, image.width, image.height)

  return imageData
}

export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): boolean {
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
    // here you can return some usefull information like delta width and delta height instead of just true
    // this information can be used in the next redraw...
    return true
  }

  return false
}

export function resizeCanvas(canvas: HTMLCanvasElement) {
  const { width, height } = canvas.getBoundingClientRect()

  if (canvas.width !== width || canvas.height !== height) {
    const { devicePixelRatio: ratio = 1 } = window
    const context = canvas.getContext('2d')
    canvas.width = width * ratio
    canvas.height = height * ratio
    context?.scale(ratio, ratio)
    return true
  }

  return false
}
