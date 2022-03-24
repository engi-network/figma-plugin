import { useEffect, useState } from 'react'

import { randomString } from '~/app/lib/utils/string'

import Canvas, { CanvasProps } from './Canvas'

interface Props extends CanvasProps {
  label?: string
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
  ...rest
}: Props) {
  const [inputId, setInputId] = useState(id)

  useEffect(() => {
    if (!id) {
      setInputId(`${randomString(10)}-input`)
    }
  }, [id])

  return (
    <div className="flex flex-col items-center">
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
        <label className="text-base text-gray-400" htmlFor={inputId}>
          {label}
        </label>
      )}
    </div>
  )
}

export default CanvasContainer
