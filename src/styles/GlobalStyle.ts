import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
  }

  a {
    color: unset;
    text-decoration: none;
  }

  html, body {
    height: 100%;
  }
`