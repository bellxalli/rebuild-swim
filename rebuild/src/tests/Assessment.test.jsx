import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Assessment from '../pages/Assessment.jsx'
import questions from '../data/swimQuiz.json'
import levels from '../data/levels.json'

function renderAssessment() {
  return render(
    <MemoryRouter>
      <Assessment />
    </MemoryRouter>
  )
}

// Helper: answer all questions with a given option index (0=min, 3=max)
function answerAll(optionIndex = 0) {
  questions.forEach(q => {
    const buttons = screen.getAllByText(q.options[optionIndex].text)
    fireEvent.click(buttons[0])
  })
}

describe('Assessment page', () => {
  it('renders all quiz questions', () => {
    renderAssessment()
    questions.forEach(q => {
      expect(screen.getByText(q.question)).toBeInTheDocument()
    })
  })

  it('renders answer options for each question', () => {
    renderAssessment()
    questions.forEach(q => {
      q.options.forEach(opt => {
        expect(screen.getByText(opt.text)).toBeInTheDocument()
      })
    })
  })

  it('allows the user to select an answer', () => {
    renderAssessment()
    const firstOption = screen.getByText(questions[0].options[0].text)
    fireEvent.click(firstOption)
    expect(firstOption).toHaveClass('selected')
  })

  it('allows the user to change their answer', () => {
    renderAssessment()
    const first = screen.getByText(questions[0].options[0].text)
    const second = screen.getByText(questions[0].options[1].text)
    fireEvent.click(first)
    fireEvent.click(second)
    expect(second).toHaveClass('selected')
    expect(first).not.toHaveClass('selected')
  })

  it('shows an error when submitting without answering all questions', () => {
    renderAssessment()
    fireEvent.click(questions[0].options[0].text) // answer only one
    const submitBtn = screen.getByText('See my result →')
    fireEvent.click(submitBtn)
    expect(screen.getByRole('alert')).toHaveTextContent('Please answer all questions')
  })

  it('shows results after answering all questions and submitting', () => {
    renderAssessment()
    answerAll(0) // all minimum answers
    fireEvent.click(screen.getByText('See my result →'))
    expect(screen.getByText('Your result')).toBeInTheDocument()
  })

  it('assigns Beginner level for minimum score (0)', () => {
    renderAssessment()
    answerAll(0) // all score 0
    fireEvent.click(screen.getByText('See my result →'))
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })

  it('assigns Advanced Swimmer level for maximum score (15)', () => {
    renderAssessment()
    answerAll(3) // all score 3
    fireEvent.click(screen.getByText('See my result →'))
    expect(screen.getByText('Advanced Swimmer')).toBeInTheDocument()
  })

  it('displays correct score in results', () => {
    renderAssessment()
    answerAll(0)
    fireEvent.click(screen.getByText('See my result →'))
    // score should be "0/15"
    expect(screen.getByText('0/15')).toBeInTheDocument()
  })

  it('displays next steps in results', () => {
    renderAssessment()
    answerAll(0)
    fireEvent.click(screen.getByText('See my result →'))
    const beginnerLevel = levels.find(l => l.id === 'beginner')
    expect(screen.getByText(beginnerLevel.nextSteps[0])).toBeInTheDocument()
  })

  it('displays recommended category tags', () => {
    renderAssessment()
    answerAll(0)
    fireEvent.click(screen.getByText('See my result →'))
    const beginnerLevel = levels.find(l => l.id === 'beginner')
    beginnerLevel.recommendedCategories.forEach(cat => {
      expect(screen.getByText(cat)).toBeInTheDocument()
    })
  })

  it('allows retaking the assessment', () => {
    renderAssessment()
    answerAll(0)
    fireEvent.click(screen.getByText('See my result →'))
    fireEvent.click(screen.getByText('Retake assessment'))
    expect(screen.getByText(questions[0].question)).toBeInTheDocument()
  })

  it('score is calculated correctly for mixed answers', () => {
    renderAssessment()
    // Select index 1 for all (score 1 each) = total 5
    answerAll(1)
    fireEvent.click(screen.getByText('See my result →'))
    expect(screen.getByText('5/15')).toBeInTheDocument()
  })
})

describe('Score to level mapping', () => {
  it('levels cover the full score range with no gaps', () => {
    const maxScore = questions.length * 3 // 15
    for (let score = 0; score <= maxScore; score++) {
      const match = levels.find(l => score >= l.minScore && score <= l.maxScore)
      expect(match, `No level found for score ${score}`).toBeDefined()
    }
  })
})
