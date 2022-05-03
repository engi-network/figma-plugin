import { fireEvent, render, screen } from '@testing-library/react'

import Button from './Button'

// import { COLORS } from '~/app/lib/constants'

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

  //fail case to submit to Engi job
  it('should have expected background color and color', () => {
    render(
      <Button label="Click me" onClick={jest.fn()} backgroundColor="white">
        Button title
      </Button>,
    )

    const button = screen.getByRole('button')
    expect(button).toHaveStyle("background: 'white'")
    // expect(button).toHaveStyle(`color: ${COLORS.PRIMARY.DARK}`)
  })
})
