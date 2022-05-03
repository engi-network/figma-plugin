import { fireEvent, render, screen } from '@testing-library/react'

import Checkbox from './Checkbox'

describe('Checkbox', () => {
  it('should render correctly with initial state', () => {
    const {
      container: { firstChild: checkboxContainer },
    } = render(
      <Checkbox onChange={jest.fn()} isDisabled={false} label={'Check me'} />,
    )

    expect(checkboxContainer).toBeInTheDocument()
    expect((checkboxContainer?.firstChild as HTMLInputElement).checked).toEqual(
      false,
    )

    const label = screen.getByText('Check me')
    expect(label).toBeInTheDocument()
  })

  it('should change state when clicking', () => {
    const handleChange = jest.fn()

    const {
      container: { firstChild: checkboxContainer },
    } = render(
      <Checkbox
        onChange={handleChange}
        isDisabled={false}
        label={'Check me'}
      />,
    )

    fireEvent.click(checkboxContainer as ChildNode)
    expect(handleChange).toBeCalledTimes(1)
    expect((checkboxContainer?.firstChild as HTMLInputElement).checked).toEqual(
      true,
    )
  })

  it('should disable changing when set to disabled', () => {
    const handleChange = jest.fn()

    const {
      container: { firstChild: checkboxContainer },
    } = render(
      <Checkbox onChange={handleChange} isDisabled label={'Check me'} />,
    )

    fireEvent.click(checkboxContainer as ChildNode)
    expect(handleChange).not.toBeCalled()
  })
})
