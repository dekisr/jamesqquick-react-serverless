import React from 'react'
import CTA from '../styled/CTA'
import { Accent, StyledTitle } from '../styled/Random'

const Home = () => {
  return (
    <div>
      <StyledTitle>Read to type?</StyledTitle>
      <CTA to="/game">
        Click or type <Accent>'s'</Accent> to start playing!
      </CTA>
    </div>
  )
}

export default Home
