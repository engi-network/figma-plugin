import { useCallback } from 'react'

import { decode } from '~/app/lib/utils/canvas'

import useSelectionEvent from './useSelectionEvent'

function usePreviewData() {
  const { selectionData, errorUI, isLoading } = useSelectionEvent()

  const drawCallback = useCallback(
    async (canvas: HTMLCanvasElement, context: RenderingContext) => {
      if (!selectionData) {
        return
      }

      const { frame } = selectionData
      await decode(canvas, context as CanvasRenderingContext2D, frame)
    },
    [selectionData],
  )

  return {
    draw: drawCallback,
    selectionData,
    errorUI,
    isLoading,
  }
}

export default usePreviewData
