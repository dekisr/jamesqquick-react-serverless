import React, { createContext, useContext, useState } from 'react'

const ScoreContext = createContext()
const useScore = () => useContext(ScoreContext)

const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(-1)
  return (
    <ScoreContext.Provider value={[score, setScore]}>
      {children}
    </ScoreContext.Provider>
  )
}

export { ScoreProvider, useScore }
