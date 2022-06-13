import { useEffect, useRef } from 'react'

export interface CanvasOption {
  contextId: '2d' | '3d'
  postdraw?: (canvas?: HTMLCanvasElement, context?: RenderingContext) => void
  predraw?: () => void
}

function setupCanvas(canvas: HTMLCanvasElement): RenderingContext | null {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  const ctx = canvas.getContext('2d')

  ctx?.scale(dpr, dpr)
  return ctx
}

const useCanvas = (
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => void,
  options: CanvasOption,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { contextId = '2d', postdraw, predraw } = options

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    let context = canvas.getContext(contextId)
    context = setupCanvas(canvas)

    if (!context) {
      return
    }

    predraw && predraw()
    draw(canvas, context)
    postdraw && postdraw(canvas, context)
  }, [draw])

  return canvasRef
}

export default useCanvas
