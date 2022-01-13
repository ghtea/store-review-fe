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

  button {
    width: auto;
    display: inline-flex;
    border: none;
    padding: 0;
    margin: 0;
    text-decoration: none;
    font-size: 1rem;
    line-height: 1;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }

  input {
    outline: none;
    border: none;
    margin: 0;
    font-size: 1rem;
  }

  textarea {
    font-size: 1rem;
  }
`