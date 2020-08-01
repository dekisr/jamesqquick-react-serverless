import React, { useState, useEffect } from 'react'
import { ScoresList, ScoreLI } from '../styled/HighScores'

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
      <h1>HighScores</h1>
      <ScoresList>
        {highScores.map((score) => (
          <ScoreLI key={score.id}>
            {score.fields.name} - {score.fields.score}
          </ScoreLI>
        ))}
      </ScoresList>
    </div>
  )
}

export default HighScores
