import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { act } from '@testing-library/react-hooks'

import Datepicker from './Datepicker'

describe('Datepicker', () => {
  it('should render correctly with initial state', () => {
    const { getByTestId } = render(
      <Datepicker
        value={'2022-05-18'}
        onChange={jest.fn()}
        id={'test-datepicker'}
      />,
    )

    const datepickerContainer = getByTestId('test-datepicker')
    expect(datepickerContainer).toBeInTheDocument()
    const input = screen.getByLabelText('datepicker') as HTMLInputElement
    expect(input.type).toBe('date')
    expect(input).toBeInTheDocument()
    expect(input.value).toEqual('2022-05-18')
  })

  it('should change value on change', async () => {
    let mockValue = '2022-05-18'
    const handleChange = jest.fn((value) => (mockValue = value))

    render(
      <Datepicker
        value={mockValue}
        onChange={handleChange}
        id={'test-datepicker'}
      />,
    )

    const input = screen.getByLabelText('datepicker') as HTMLInputElement
    act(() => {
      fireEvent.change(input, { target: { value: '2022-05-19' } })
    })
    expect(handleChange).toBeCalledTimes(1)
    await waitFor(() => expect(input).toHaveValue('2022-05-19'))
  })
})
