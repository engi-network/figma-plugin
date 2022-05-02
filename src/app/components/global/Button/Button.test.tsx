import { render, screen } from '@testing-library/react'

import Button from './Button'

describe('Button', () => {
  it('has expected initial state', () => {
    render(
      <Button label="Click me" primary onClick={jest.fn()}>
        Button title
      </Button>,
    )

    const buttonTitle = screen.getByText('Button title')

    expect(buttonTitle).toBeInTheDocument()
  })
})
