import React, { useState, useEffect, useCallback } from 'react'
import { Redirect } from 'react-router-dom'
// import { useAuth0 } from '@auth0/auth0-react'

import CTA from '../styled/CTA'
import { Accent, StyledTitle } from '../styled/Random'

const Home = () => {
  // const { user } = useAuth0()
  // console.log(user)
  const [toGamePage, setToGamePage] = useState(false)

  const keyUpHandler = useCallback((e) => {
    if (e.key === 's') {
      setToGamePage(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keyup', keyUpHandler)
    return () => {
      document.removeEventListener('keyup', keyUpHandler)
    }
  }, [keyUpHandler])

  return toGamePage ? (
    <Redirect to="/game" />
  ) : (
    <div>
      <StyledTitle>Read to type?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing!
      </CTA>
    </div>
  )
}

export default Home
