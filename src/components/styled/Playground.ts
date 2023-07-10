import styled from "styled-components";


export const Wrapper = styled.div`
  margin: 1000px 0;

  width: 100%;
  color: #ffffff;

  background-color: aqua;
  height: 200px;
`
export const Flex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({reversed}) => reversed};
  //column-gap: 1rem;
  margin: 1rem 0;
`

export const Desktop = styled.div`
  width: 70%;
  background-color: #7272c7;

`
export const DesktopName = styled.div`


`


export const Mobile = styled.div`
  background-color: #233f27;
  width: 30%;

`

export const MobileName = styled.div`

  right: 0;


`