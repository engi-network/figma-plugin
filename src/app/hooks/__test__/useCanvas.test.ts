import { renderHook } from '@testing-library/react-hooks'

import useCanvas, { CanvasOption } from '../useCanvas'

// import { act } from 'react-test-renderer'

describe('useCanvas', () => {
  it('returns null when initialization', () => {
    const draw = jest.fn()
    const options: CanvasOption = { contextId: '2d' }

    const { result } = renderHook(() => useCanvas(draw, options))
    expect(result.current.current).toBe(null)
    expect(draw).not.toHaveBeenCalled()
  })
})
