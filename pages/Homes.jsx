import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero" aria-label="Welcome to NextSwim Lite">
        <div className="hero-bg" />
        <div className="hero-lanes" aria-hidden="true">
          <div className="lane" />
          <div className="lane" />
          <div className="lane" />
          <div className="lane" />
          <div className="lane" />
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow">Swim assessment &amp; resources</p>
          <h1 className="hero-title">
            Find out <em>where you are</em> in the water.
          </h1>
          <p className="hero-desc">
            Answer five quick questions and get an honest read on your swimming level — along with the resources and next steps that match.
          </p>
          <div className="hero-actions">
            <Link to="/assessment" className="btn btn-coral">
              Take the assessment →
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              Browse resources
            </Link>
          </div>
        </div>
        <div className="hero-scroll" aria-hidden="true">
          <span>scroll</span>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="currentColor">
            <path d="M6 0v12M1 8l5 7 5-7" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" aria-labelledby="how-title">
        <div className="container">
          <p className="section-label">How it works</p>
          <h2 className="section-title" id="how-title">Three steps to a clearer path</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num" aria-hidden="true">1</div>
              <h3>Answer 5 questions</h3>
              <p>No equipment needed. Just honest answers about your comfort, float, treading, distance, and stroke knowledge.</p>
            </div>
            <div className="step-card">
              <div className="step-num" aria-hidden="true">2</div>
              <h3>Get your swim level</h3>
              <p>We calculate your score and match you to one of four levels — from Beginner to Advanced — with a plain-English description.</p>
            </div>
            <div className="step-card">
              <div className="step-num" aria-hidden="true">3</div>
              <h3>See what's next</h3>
              <p>Your results include concrete next steps and curated resource categories matched to exactly where you are right now.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Levels preview */}
      <section className="levels-strip" aria-labelledby="levels-title">
        <div className="container">
          <p className="section-label">Swim levels</p>
          <h2 className="section-title" id="levels-title">Where do you land?</h2>
          <div className="levels-grid">
            <div className="level-chip">
              <p className="level-chip-label">Level 1</p>
              <h4>Beginner</h4>
              <p>Building comfort and basic water skills</p>
            </div>
            <div className="level-chip">
              <p className="level-chip-label">Level 2</p>
              <h4>Developing Swimmer</h4>
              <p>Floating, treading, and learning technique</p>
            </div>
            <div className="level-chip">
              <p className="level-chip-label">Level 3</p>
              <h4>Intermediate Swimmer</h4>
              <p>Swimming laps and refining strokes</p>
            </div>
            <div className="level-chip">
              <p className="level-chip-label">Level 4</p>
              <h4>Advanced Swimmer</h4>
              <p>Multi-stroke, endurance, and performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" aria-labelledby="cta-title">
        <div className="container">
          <h2 id="cta-title">Ready to find out?</h2>
          <p>The assessment takes about two minutes and no pool is required.</p>
          <Link to="/assessment" className="btn btn-primary">
            Start the assessment →
          </Link>
        </div>
      </section>
    </>
  )
}
