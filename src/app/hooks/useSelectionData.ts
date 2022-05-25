import { useCallback } from 'react'

import { drawImage } from '~/app/lib/utils/canvas'

import useSelectionEvent from './useSelectionEvent'

function usePreviewData() {
  const { selectionData, selectionError, isLoading } = useSelectionEvent()

  const drawCallback = useCallback(
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!selectionData) {
        return
      }

      const { frame } = selectionData
      await drawImage(canvas, context as CanvasRenderingContext2D, frame)
    },
    [selectionData],
  )

  return {
    draw: drawCallback,
    selectionData,
    selectionError,
    isLoading,
  }
}

export default usePreviewData
