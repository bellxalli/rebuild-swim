import { useState } from 'react'
import { Link } from 'react-router-dom'
import questions from '../data/swimQuiz.json'
import levels from '../data/levels.json'

function getLevel(score) {
  return levels.find(l => score >= l.minScore && score <= l.maxScore) ?? levels[0]
}

function calcScore(answers) {
  return Object.values(answers).reduce((sum, score) => sum + score, 0)
}

export default function Assessment() {
  const [answers, setAnswers] = useState({})       // { questionId: score }
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const totalQuestions = questions.length
  const answeredCount = Object.keys(answers).length
  const progress = (answeredCount / totalQuestions) * 100

  function handleSelect(questionId, score) {
    setAnswers(prev => ({ ...prev, [questionId]: score }))
    if (error) setError('')
  }

  function handleSubmit() {
    if (answeredCount < totalQuestions) {
      setError('Please answer all questions before submitting.')
      return
    }
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRetake() {
    setAnswers({})
    setSubmitted(false)
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    const score = calcScore(answers)
    const level = getLevel(score)
    return (
      <div className="results-wrap">
        <div aria-live="polite">
          <div className="result-level-badge">Your result</div>
          <div className="card result-card">
            <div className="score-display">
              <div>
                <div className="score-num">{score}/{totalQuestions * 3}</div>
                <div className="score-label">Your score</div>
              </div>
            </div>

            <h2>{level.label}</h2>
            <p className="result-tagline">{level.tagline}</p>
            <p className="result-desc">{level.description}</p>

            <p className="result-section-title">Suggested next steps</p>
            <ul className="next-steps-list">
              {level.nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>

            <p className="result-section-title">Recommended resource categories</p>
            <div className="rec-categories">
              {level.recommendedCategories.map(cat => (
                <span key={cat} className="cat-tag">{cat}</span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn btn-secondary" onClick={handleRetake}>
              Retake assessment
            </button>
            <Link
              to="/resources"
              className="btn btn-primary"
            >
              Browse resources →
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="assessment-wrap">
      <div className="page-header" style={{ textAlign: 'left', padding: '48px 0 32px' }}>
        <h1>Swim Assessment</h1>
        <p>Answer each question as honestly as you can — there are no wrong answers, only a more accurate result.</p>
      </div>

      <div className="progress-bar-wrap" role="progressbar" aria-valuenow={answeredCount} aria-valuemin={0} aria-valuemax={totalQuestions} aria-label="Quiz progress">
        <div className="progress-label">
          <span>Progress</span>
          <span>{answeredCount} of {totalQuestions} answered</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {questions.map((q, idx) => (
          <div key={q.id} className="card question-card">
            <p className="q-num">Question {idx + 1} of {totalQuestions}</p>
            <h2>{q.question}</h2>
            <div className="options-list" role="radiogroup" aria-label={q.question}>
              {q.options.map((opt, oi) => (
                <button
                  key={oi}
                  role="radio"
                  aria-checked={answers[q.id] === opt.score}
                  className={`option-btn${answers[q.id] === opt.score ? ' selected' : ''}`}
                  onClick={() => handleSelect(q.id, opt.score)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="error-msg" role="alert">
          {error}
        </div>
      )}

      <div className="quiz-nav">
        <span style={{ fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
          {answeredCount < totalQuestions
            ? `${totalQuestions - answeredCount} question${totalQuestions - answeredCount !== 1 ? 's' : ''} remaining`
            : 'All questions answered — ready to submit!'}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={answeredCount === 0}
        >
          See my result →
        </button>
      </div>
    </div>
  )
}
