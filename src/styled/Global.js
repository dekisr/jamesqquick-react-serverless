import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
:root {
  --main-bg-color: ${({ theme }) => theme.mainBgColor};
  --main-text-color: ${({ theme }) => theme.mainTextColor};
  --accent-color: ${({ theme }) => theme.accentColor};
}
  * {
    box-sizing: border-box;
    color: var(--main-text-color);
    margin: 0;
    font-family: sans-serif;
    font-weight: 300;
  }

  h1, h2 {
    margin-bottom: 2rem;
  }
`
