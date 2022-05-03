import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import Header from './Header'

describe('Header', () => {
  it('should render correctly with props', () => {
    const { container } = render(
      <Router>
        <Header numberOfProgress={2} />
      </Router>,
    )

    expect(container).toBeInTheDocument()
    const progressWrapper = screen.getByLabelText('In progress')
    expect(progressWrapper.lastChild.textContent).toBe('2')
  })

  /**
   * @REF https://v5.reactrouter.com/web/guides/testing
   */
  // it('should navigate to the specific page when clicking links', () => {})
})
