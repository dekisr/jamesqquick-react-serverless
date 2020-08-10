import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

// import useTheme from '../hooks/UseTheme'

import {
  StyledNavbar,
  StyledNavBrand,
  StyledNavItems,
  StyledLink,
  StyledButtonLink,
} from '../styled/Navbar'
import { Accent } from '../styled/Random'
import { StyledButton } from '../styled/Buttons'

const Navbar = ({ toggleTheme }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <Link to="/">
          Learn.Build.<Accent>Type.</Accent>
        </Link>
      </StyledNavBrand>
      <StyledNavItems>
        <li>
          <StyledLink to="/">Home</StyledLink>
        </li>
        <li>
          <StyledLink to="/highscores">High Scores</StyledLink>
        </li>
        {isAuthenticated ? (
          <li>
            <StyledButtonLink onClick={() => logout()}>
              Log Out
            </StyledButtonLink>
          </li>
        ) : (
          <li>
            <StyledButtonLink onClick={() => loginWithRedirect()}>
              Log In
            </StyledButtonLink>
          </li>
        )}
        <li>
          <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
        </li>
      </StyledNavItems>
    </StyledNavbar>
  )
}

export default Navbar
