import styled from "styled-components";

interface SwitcherContainerProps {
    themeValue: "light" | "dark"
}
interface IconProps {
    themeValue: "light" | "dark"
}
export const SwitcherContainer = styled('div')<SwitcherContainerProps>`
  position: relative;
  width: 50px;
  height: 1.5rem;
  padding: 3px;
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.text};
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 50px;
`
export const Icon = styled("div")<IconProps>`
  display: flex;
  align-items: center;
  position: absolute;
  left: ${props => props.themeValue === "light" ? "0" : "50%"};
  transition: cubic-bezier(0, 0, 0, 1.13) 1000ms;
`
