// global.js
// Source: https://github.com/maximakymenko/react-day-night-toggle-app/blob/master/src/global.js#L23-L41

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --main-background: ${({ theme }) => theme.body};
    --main-text-color: ${({ theme }) => theme.text};
  }`;
