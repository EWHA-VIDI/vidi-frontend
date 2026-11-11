import { render, screen } from '@testing-library/react'

import { App } from '@/app/App'

describe('App', () => {
  it('renders the VIDI home screen', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: 'VIDI' })).toBeInTheDocument()
  })
})
