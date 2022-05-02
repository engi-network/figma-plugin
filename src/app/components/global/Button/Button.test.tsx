import { fireEvent, render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
  it('has expected initial state', () => {
    render(
      <Button label="Click me" primary onClick={jest.fn()} type="submit">
        Button title
      </Button>,
    )

    const buttonTitle = screen.getByText('Button title')

    expect(buttonTitle).toBeInTheDocument()
  })

  it('clicking working as expected when enabled', () => {
    const onClick = jest.fn()

    render(
      <Button label="Click me" primary onClick={onClick} type="submit">
        Button title
      </Button>,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should disable clicking when disabled true', () => {
    const onClick = jest.fn()
    render(
      <Button label="Click me" primary onClick={onClick} disabled>
        Button title
      </Button>,
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})
