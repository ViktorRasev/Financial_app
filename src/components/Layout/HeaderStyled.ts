import styled from "styled-components"


interface HeaderDivProps {
    themeValue: "light" | "dark";
}
export const HeaderDiv = styled('div')<HeaderDivProps>`
  margin: .5rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.primary};
  border: 1px solid #317d88;
  padding: 1rem;
`
