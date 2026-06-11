import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Nav from '../components/Nav.jsx'

function renderNav(initialEntry = '/') {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <Nav />
    </MemoryRouter>
  )
}

describe('Navigation', () => {
  it('renders the logo', () => {
    renderNav()
    expect(screen.getByText(/NextSwim/i)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Assessment/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Resources/i })).toBeInTheDocument()
  })

  it('Home link points to /', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /Home/i })).toHaveAttribute('href', '/')
  })

  it('Assessment link points to /assessment', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /Assessment/i })).toHaveAttribute('href', '/assessment')
  })

  it('Resources link points to /resources', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /Resources/i })).toHaveAttribute('href', '/resources')
  })

  it('has a main navigation landmark', () => {
    renderNav()
    expect(screen.getByRole('navigation', { name: /Main navigation/i })).toBeInTheDocument()
  })
})
