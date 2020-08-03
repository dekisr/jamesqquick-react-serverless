import React from 'react'
import ReactDOM from 'react-dom'
import { Auth0Provider } from '@auth0/auth0-react'

import './index.css'
import * as serviceWorker from './serviceWorker'

import { ScoreProvider } from './contexts/ScoreContext'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="jqq-typegame-course.us.auth0.com"
      clientId="WbeHQaIJl5BAxJ3ao9lMLy7ALwSaQlcp"
      redirectUri={window.location.origin}
    >
      <ScoreProvider>
        <App />
      </ScoreProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
