import { ArrowLeftIcon } from '@heroicons/react/solid'
import { fireEvent, render, screen } from '@testing-library/react'

import { BUTTON_STYLE } from '~/app/lib/constants'

import IconButton from './IconButton'

describe('IconButton', () => {
  it('should render with initial props', () => {
    const { getByTestId } = render(
      <IconButton
        id={'icon-button'}
        icon={<ArrowLeftIcon className="w-4 h-4 text-primary-dark" />}
        buttonStyle={BUTTON_STYLE.OUTLINED}
        onClick={jest.fn()}
      >
        Button text
      </IconButton>,
    )

    const iconButton = getByTestId('icon-button')
    expect(iconButton).toBeInTheDocument()
  })
})
