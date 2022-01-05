import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    box-sizing: border-box;
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
  }
`