import useCanvas, { CanvasOption } from '~/app/hooks/useCanvas'

interface Props {
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
}: Props) {
  const { contextId } = options
  const canvasRef = useCanvas(draw, { contextId })

  return (
    <canvas
      id={id}
      ref={canvasRef}
      className={className}
      width={width}
      height={height}
      {...rest}
    />
  )
}

export default Canvas
