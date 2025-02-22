import React, { useEffect, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

import { useScore } from '../contexts/ScoreContext'

import { StyledLink } from '../styled/Navbar'
import { StyledCharacter } from '../styled/Game'
import { StyledTitle } from '../styled/Random'

const GameOver = () => {
  const [score] = useScore()
  const [scoreMessage, setScoreMessage] = useState('')
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const history = useHistory()

  if (score === -1) {
    history.push('/')
  }

  const keyUpHandler = useCallback(
    (e) => {
      if (e.key === 's') {
        history.push('/game')
      }
    },
    [history]
  )

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [keyUpHandler])

  useEffect(() => {
    const saveHighScore = async () => {
      try {
        const token = await getAccessTokenSilently()
        const options = {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            // name: 'testHCname',
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
        } else if (data.error) {
          setScoreMessage(`Error: ${data.error}`)
        } else {
          setScoreMessage('Sorry, not a high score...')
        }
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (isAuthenticated && score !== -1) {
      saveHighScore()
    }
  }, [score, getAccessTokenSilently, isAuthenticated])

  return (
    <div>
      <StyledTitle>GameOver</StyledTitle>
      {!isAuthenticated ? (
        <h2>You should log in to compete for high scores!</h2>
      ) : (
        <h2>{!scoreMessage ? 'checking score...' : scoreMessage}</h2>
      )}
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
