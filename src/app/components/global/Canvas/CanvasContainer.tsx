import { ReactNode, useEffect, useState } from 'react'

import { randomString } from '~/app/lib/utils/string'

import Canvas, { CanvasProps } from './Canvas'

interface Props extends CanvasProps {
  icon?: ReactNode
  label?: ReactNode
}

function CanvasContainer({
  draw,
  width,
  height,
  id,
  options,
  label,
  className,
  children,
  icon,
  ...rest
}: Props) {
  const [inputId, setInputId] = useState(id)

  useEffect(() => {
    if (!id) {
      setInputId(`${randomString(10)}-input`)
    }
  }, [id])

  return (
    <div className="flex flex-col items-center justify-start relative w-full h-full">
      <Canvas
        id={inputId}
        draw={draw}
        width={width}
        height={height}
        options={options}
        className={className}
        {...rest}
      >
        {children}
      </Canvas>
      {label && (
        <label
          className="text-sm text-text-secondary flex justify-center items-center"
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      {icon && (
        <div className="absolute top-2 left-2 border border-text-secondary rounded-full backdrop-blur-[4x] min-h-[32px] min-w-[32px]">
          {icon}
        </div>
      )}
    </div>
  )
}

export default CanvasContainer
