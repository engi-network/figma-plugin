import { fireEvent, render } from '@testing-library/react'

import Input from './Input'

describe('Input', () => {
  it('should render correctly with the initial state', () => {
    const { getByPlaceholderText, getByRole, getByLabelText } = render(
      <Input
        label="Component"
        onChange={jest.fn()}
        value={'initial value'}
        placeholder={'placeholder'}
        error={'This field has an error!'}
        disabled
      />,
    )

    const input = getByPlaceholderText('placeholder') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('initial value')
    expect(input.disabled).toBe(true)

    const label = getByLabelText('Component')
    expect(label).toBeVisible()

    const errorWrapper = getByRole('alert')
    expect(errorWrapper).toBeInTheDocument()
    expect(errorWrapper.textContent).toBe('This field has an error!')
  })

  it('should change value when user types', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <Input
        label="Component"
        onChange={handleChange}
        value={''}
        placeholder={'placeholder'}
      />,
    )

    const input = getByPlaceholderText('placeholder') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith('new value')
  })

  // it('should not change when disable is set', () => {})
})
