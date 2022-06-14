import { useEffect, useState } from 'react'

interface Size {
  height: number
  width: number
}

export function useWindowSize() {
  const [elementSize, setElementSize] = useState<Size>({
    height: window.innerHeight,
    width: window.innerWidth,
  })

  useEffect(() => {
    const handleResize = () => {
      setElementSize({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize() // triggers a re-render, potentially rendering a new value for element
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return elementSize
}
