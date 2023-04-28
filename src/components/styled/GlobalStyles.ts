import { createGlobalStyle } from "styled-components"

export interface DefaultTheme {
    body: string,
    text: string,
}

export const GlobalStyles = createGlobalStyle<{theme: DefaultTheme}>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
`