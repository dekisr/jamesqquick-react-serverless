import React, { useState, useEffect } from 'react'
import { ScoresList, ScoreLI } from '../styled/HighScores'
import { StyledTitle } from '../styled/Random'

const HighScores = () => {
  const [highScores, setHighScores] = useState([])
  useEffect(() => {
    console.log('getting high scores...')
    const loadHighScores = async () => {
      try {
        const response = await fetch('/.netlify/functions/getHighScores')
        const scores = await response.json()
        setHighScores(scores)
      } catch (error) {
        console.log(error)
      }
    }
    loadHighScores()
  }, [])
  return (
    <div>
      <StyledTitle>High Scores</StyledTitle>
      <ScoresList>
        {highScores.map((score, index) => (
          <ScoreLI key={score.id}>
            {index + 1}. {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  )
}

export default HighScores
