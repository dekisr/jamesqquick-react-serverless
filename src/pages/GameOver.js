import React, { useEffect, useState } from 'react'
import { useScore } from '../contexts/ScoreContext'
import { useHistory } from 'react-router-dom'
import { StyledLink } from '../styled/Navbar'
import { StyledCharacter } from '../styled/Game'
import { StyledTitle } from '../styled/Random'

const GameOver = () => {
  const [score] = useScore()
  const [scoreMessage, setScoreMessage] = useState('')
  const history = useHistory()

  if (score === -1) {
    history.push('/')
  }

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const options = {
          method: 'POST',
          body: JSON.stringify({
            name: 'HIGH?',
            score,
          }),
        }
        const response = await fetch(
          '/.netlify/functions/saveHighScore',
          options
        )
        const data = await response.json()
        if (data.id) {
          setScoreMessage('Congrats! You got a high score!')
        } else {
          setScoreMessage('Sorry, not a high score...')
        }
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    saveHighScore()
  }, [score])

  return (
    <div>
      <StyledTitle>GameOver</StyledTitle>
      <h2>{scoreMessage}</h2>
      <StyledCharacter>{score}</StyledCharacter>
      <div>
        <StyledLink to="/">Go Home</StyledLink>
      </div>
      <div>
        <StyledLink to="/game">Play Again</StyledLink>
      </div>
    </div>
  )
}

export default GameOver
