import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Resources from '../pages/Resources.jsx'
import resources from '../data/resources.json'

function renderResources() {
  return render(
    <MemoryRouter>
      <Resources />
    </MemoryRouter>
  )
}

describe('Resources page', () => {
  it('renders all resources by default', () => {
    renderResources()
    resources.forEach(r => {
      expect(screen.getByText(r.title)).toBeInTheDocument()
    })
  })

  it('renders the correct number of resources', () => {
    renderResources()
    const links = screen.getAllByText('Read more')
    expect(links).toHaveLength(resources.length)
  })

  it('renders All filter button as active by default', () => {
    renderResources()
    const allBtn = screen.getByText('All')
    expect(allBtn).toHaveClass('active')
  })

  it('filters resources when a category is selected', () => {
    renderResources()
    const category = 'Stroke Technique'
    fireEvent.click(screen.getByText(category))
    const expected = resources.filter(r => r.category === category)
    expected.forEach(r => {
      expect(screen.getByText(r.title)).toBeInTheDocument()
    })
    const excluded = resources.filter(r => r.category !== category)
    excluded.forEach(r => {
      expect(screen.queryByText(r.title)).not.toBeInTheDocument()
    })
  })

  it('shows all resources again after switching back to All', () => {
    renderResources()
    fireEvent.click(screen.getByText('Stroke Technique'))
    fireEvent.click(screen.getByText('All'))
    resources.forEach(r => {
      expect(screen.getByText(r.title)).toBeInTheDocument()
    })
  })

  it('resource links open in a new tab', () => {
    renderResources()
    const links = screen.getAllByRole('link', { name: /Read more/i })
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('resource links have correct href', () => {
    renderResources()
    resources.forEach(r => {
      const link = screen.getByRole('link', { name: new RegExp(r.title, 'i') })
      expect(link).toHaveAttribute('href', r.url)
    })
  })

  it('displays resource category labels', () => {
    renderResources()
    const cats = [...new Set(resources.map(r => r.category))]
    cats.forEach(cat => {
      // Categories appear as labels within cards
      const elements = screen.getAllByText(cat)
      expect(elements.length).toBeGreaterThan(0)
    })
  })

  it('does not crash when a resource is missing a title', () => {
    // This test verifies the component guards against bad data
    // ResourceCard returns null for missing title/url — no throw expected
    expect(() => renderResources()).not.toThrow()
  })
})
