import cn from 'classnames'

import useCanvas, { CanvasOption } from '~/app/hooks/useCanvas'

export interface CanvasProps {
  className?: string
  draw: (canvas: HTMLCanvasElement, context: RenderingContext) => void
  height?: number
  id?: string
  options: CanvasOption
  width?: number
}

function Canvas({
  id,
  draw,
  options,
  className,
  width,
  height,
  ...rest
}: CanvasProps) {
  const canvasRef = useCanvas(draw, options)
  const classes = cn('border border-wf-tertiery rounded-st-small', className)

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={classes}
      width={width}
      height={height}
      {...rest}
    />
  )
}

export default Canvas
