import React from 'react'
import { useScore } from '../contexts/ScoreContext'
import { useHistory } from 'react-router-dom'
import { StyledLink } from '../styled/Navbar'

const GameOver = () => {
  const [score] = useScore()
  const history = useHistory()

  if (score === -1) {
    history.push('/')
  }

  return (
    <div>
      <h1>GameOver</h1>
      <p>{score}</p>
      <StyledLink to="/">Go Home</StyledLink>
      <StyledLink to="/game">Play Again</StyledLink>
    </div>
  )
}

export default GameOver
