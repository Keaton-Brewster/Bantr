import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --main-background: ${({ theme }) => theme.body};
    --main-text-color: ${({ theme }) => theme.text};;
    --active: ${({ theme }) => theme.LGActive}
  }`;
