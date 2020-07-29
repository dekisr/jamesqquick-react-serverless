import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  StyledGame,
  StyledScore,
  StyledTimer,
  StyledCharacter,
} from '../styled/Game'
import { Strong } from '../styled/Random'
import { useScore } from '../contexts/ScoreContext'

const Game = () => {
  const MAX_SECONDS = 5
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const [currentCharacter, setCurrentCharacter] = useState('')
  const [score, setScore] = useScore()
  const [ms, setMs] = useState(0)
  const [seconds, setSeconds] = useState(MAX_SECONDS)
  const history = useHistory()

  const updateTime = useCallback((startTime) => {
    const endTime = new Date()
    const msPassedStr = (endTime.getTime() - startTime.getTime()).toString()
    const formattedMSString = ('0000' + msPassedStr).slice(-5)
    const updatedSeconds =
      MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1
    const updatedMs =
      1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3))
    setSeconds(addLeadingZeros(updatedSeconds, 2))
    setMs(addLeadingZeros(updatedMs, 3))
  }, [])

  const addLeadingZeros = (num, length) => {
    let zeros = ''
    for (let i = 0; i < length; i++) {
      zeros += 0
    }
    return (zeros + num).slice(-length)
  }

  const keyUpHandler = useCallback(
    (e) => {
      if (e.key === currentCharacter) {
        setScore((prevScore) => prevScore + 1)
      } else {
        score && setScore((prevScore) => prevScore - 1)
      }
      setRandomCharacter()
    },
    [currentCharacter, score, setScore]
  )

  const setRandomCharacter = () => {
    const randomInt = Math.floor(Math.random() * 36)
    setCurrentCharacter(characters[randomInt])
  }

  useEffect(() => {
    setRandomCharacter()
    setScore(0)
    const currentTime = new Date()
    const interval = setInterval(() => updateTime(currentTime), 1)
    return () => clearInterval(interval)
  }, [updateTime, setScore])

  useEffect(() => {
    if (seconds <= -1) {
      history.push('/gameover')
    }
  }, [seconds, history])

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [keyUpHandler])

  return (
    <StyledGame>
      <StyledScore>
        Score:<Strong>{score}</Strong>
      </StyledScore>
      <StyledCharacter>{currentCharacter}</StyledCharacter>
      <StyledTimer>
        Time:{' '}
        <Strong>
          {seconds}:{ms}
        </Strong>
      </StyledTimer>
    </StyledGame>
  )
}

export default Game
