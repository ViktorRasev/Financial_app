import styled from "styled-components";

interface SuggestionProps {
    highlighted: boolean
}
interface ThemeProps {
    theme: {
        primary: string,
        secondary: string
    }
}
const primaryTheme = (props: ThemeProps) => props.theme.primary
const secondaryTheme = (props: ThemeProps) => props.theme.secondary

export const SearchContainer = styled("div")`
  width: 400px;
  height: fit-content;
  border: 1px solid black;
  background-color: ${props => props.theme.primary};
`
export const Input = styled("input")`
  background-color: inherit;
  color: inherit;
  width: 100%;
  font-size: 1rem;
`

export const Suggestion = styled("div")<SuggestionProps>`
  width: 100%;
  padding: 0;
  background-color: ${props => props.highlighted ? primaryTheme : secondaryTheme };
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.text};
    color: ${props => props.theme.body};
  }
  
`