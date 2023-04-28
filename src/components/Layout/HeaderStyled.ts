import styled from "styled-components"


interface HeaderDivProps {
    themeValue: "light" | "dark";
}
export const HeaderDiv = styled('div')<HeaderDivProps>`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.secondary};
  padding: 1rem;
`
