import { fireEvent, render, screen } from '@testing-library/react'

import { CanvasOption } from '~/app/hooks/useCanvas'

import Canvas from './Canvas'

describe('Canvas', () => {
  it('has rendered correctly with expected initial state', () => {
    const draw = jest.fn()
    const options: CanvasOption = { contextId: '2d' }

    render(
      <Canvas
        draw={draw}
        height={300}
        width={300}
        options={options}
        id="canvas"
      >
        Canvas Label
      </Canvas>,
    )

    const canvas = screen.getByTestId('canvas')
    expect(canvas).toBeInTheDocument()
    expect(draw).toHaveBeenCalled()
  })
})
