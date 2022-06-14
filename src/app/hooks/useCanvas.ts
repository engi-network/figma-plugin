import { useEffect, useRef, useState } from 'react'

export interface CanvasOption {
  contextId: '2d' | '3d'
  postdraw?: (canvas?: HTMLCanvasElement, context?: RenderingContext) => void
  predraw?: () => void
}

function _predraw(
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D | null,
) {
  context?.save()
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  context?.scale(dpr, dpr)
}

const _postdraw = (context) => {
  context?.restore()
}

const useCanvas = (
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => void,
  options: CanvasOption,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { contextId = '2d', postdraw, predraw } = options
  const [count, setCount] = useState(0)

  const resizeObserver = new ResizeObserver(() => {
    setCount((prev) => (prev += 1))
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    resizeObserver.observe(canvas)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const context = canvas.getContext(contextId) as CanvasRenderingContext2D

    _predraw(canvas, context)
    predraw && predraw()

    draw(canvas, context)

    postdraw && postdraw(canvas, context)
    _postdraw(context)
  }, [draw, count])

  return canvasRef
}

export default useCanvas
