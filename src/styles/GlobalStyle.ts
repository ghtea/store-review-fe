import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html {
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

  div {
    display: flex;
    flex-direction: column;
  }
`