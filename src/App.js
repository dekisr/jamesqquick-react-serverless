import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Game from './pages/Game'
import HighScores from './pages/HighScores'
import GameOver from './pages/GameOver'
import Navbar from './components/Navbar'
import { Container } from './styled/Container'
import { Main } from './styled/Main'
import Global from './styled/Global'

function App() {
  return (
    <Router>
      <Global />
      <Main>
        <Container>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/highscores">
              <HighScores />
            </Route>
            <Route path="/gameover">
              <GameOver />
            </Route>
          </Switch>
        </Container>
      </Main>
    </Router>
  )
}

export default App
