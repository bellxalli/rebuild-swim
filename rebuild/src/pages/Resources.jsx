import { useState } from 'react'
import resources from '../data/resources.json'

const ALL = 'All'

function getCategories(list) {
  const cats = [...new Set(list.map(r => r.category))]
  return [ALL, ...cats]
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState(ALL)
  const categories = getCategories(resources)

  const filtered = activeCategory === ALL
    ? resources
    : resources.filter(r => r.category === activeCategory)

  return (
    <div className="resources-wrap">
      <div className="page-header">
        <h1>Swimming Resources</h1>
        <p>Curated guides, safety tips, and technique breakdowns — organized by what you need to work on.</p>
      </div>

      <div className="container">
        <div className="filter-bar" role="group" aria-label="Filter resources by category">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No resources found</h3>
            <p>Try selecting a different category.</p>
          </div>
        ) : (
          <div className="resources-grid">
            {filtered.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ResourceCard({ resource }) {
  const { title, description, category, url } = resource

  if (!title || !url) return null

  return (
    <article className="card resource-card">
      <p className="resource-category">{category}</p>
      <h3>{title}</h3>
      <p>{description}</p>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
        aria-label={`Open "${title}" in a new tab`}
      >
        Read more
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </a>
    </article>
  )
}
