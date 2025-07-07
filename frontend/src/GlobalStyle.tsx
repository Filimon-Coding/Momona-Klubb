import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
      /* ---- eksisterende global css ---- */

  /*  NYTT: sørg for at ingen elementer kan gi horisontal scroll  */
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

`;

export default GlobalStyle;

