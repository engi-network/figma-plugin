import cn from 'classnames'
import { forwardRef, MutableRefObject, ReactNode } from 'react'

import useCanvas, { CanvasOption } from '~/app/hooks/useCanvas'
import mergeRefs from '~/app/lib/utils/ref'

export interface CanvasProps {
  children?: ReactNode
  className?: string
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => void
  height?: number
  id?: string
  options: CanvasOption
  width?: number
}

export type CanvasRefType =
  | ((instance: HTMLCanvasElement | null) => void)
  | MutableRefObject<HTMLCanvasElement | null>
  | null

function Canvas(
  {
    id,
    draw,
    options,
    className,
    width,
    height,
    children,
    ...rest
  }: CanvasProps,
  ref: CanvasRefType,
) {
  const canvasRef = useCanvas(draw, options)
  const classes = cn('border border-wf-tertiery', className)
  const mergedRef = mergeRefs([canvasRef, ref])

  return (
    <canvas
      id={id}
      ref={mergedRef}
      className={classes}
      width={width}
      height={height}
      {...rest}
    >
      {children}
    </canvas>
  )
}

export default forwardRef(Canvas)
