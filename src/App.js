import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Game from './pages/Game'
import HighScores from './pages/HighScores'
import GameOver from './pages/GameOver'
import Navbar from './components/Navbar'

function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
