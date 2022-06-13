import cn from 'classnames'
import { forwardRef, MutableRefObject, ReactNode } from 'react'

import useCanvas, { CanvasOption } from '~/app/hooks/useCanvas'
import mergeRefs from '~/app/lib/utils/ref'

export interface CanvasProps {
  children?: ReactNode
  className?: string
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => void
  height?: number | string
  id?: string
  onClick?: () => void
  options: CanvasOption
  width?: number | string
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
  const classes = cn(className, 'w-full h-full')
  const mergedRef = mergeRefs([canvasRef, ref])

  return (
    <canvas
      id={id}
      ref={mergedRef}
      className={classes}
      width={width}
      height={height}
      data-testid={id}
      {...rest}
    >
      {children}
    </canvas>
  )
}

export default forwardRef(Canvas)
