import { useEffect, useRef } from 'react'

export interface CanvasOption {
  contextId: '2d' | '3d'
  postdraw?: (canvas?: HTMLCanvasElement, context?: RenderingContext) => void
  predraw?: () => void
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

    const context = canvas.getContext(contextId)

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
