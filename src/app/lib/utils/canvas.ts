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

export async function decode(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  frame: BlobPart,
): Promise<[ImageData, string]> {
  const url = URL.createObjectURL(new Blob([frame]))

  const image: HTMLImageElement = await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject()
    img.src = url
  })

  // scale and center image in canvas
  const horizontalRatio = canvas.width / image.width
  const verticalRatio = canvas.height / image.height

  // only scale large frames down
  const ratio = Math.min(
    horizontalRatio < 1 ? horizontalRatio : 1,
    verticalRatio < 1 ? verticalRatio : 1,
  )

  const xCenterOffset = (canvas.width - image.width * ratio) / 2
  const yCenterOffset = (canvas.height - image.height * ratio) / 2

  context.clearRect(0, 0, canvas.width, canvas.height)

  context.drawImage(
    image,
    0,
    0,
    // selection frame source dimensions
    image.width,
    image.height,
    // center scaled frame image in canvas
    xCenterOffset,
    yCenterOffset,
    // canvas destination dimensions
    image.width * ratio,
    image.height * ratio,
  )

  const imageData = context.getImageData(0, 0, image.width, image.height)

  return [imageData, url]
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

    // kick off load
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
