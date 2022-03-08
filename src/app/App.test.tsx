import { render, screen } from '@testing-library/react'

import App from './App'

describe('app', () => {
  it('it has initial link buttons', () => {
    render(<App />)

    const link1 = screen.getByText('Get started')
    const link2 = screen.getByText('Learn more')

    expect(link1).toBeInTheDocument()
    expect(link2).toBeInTheDocument()
  })
})
