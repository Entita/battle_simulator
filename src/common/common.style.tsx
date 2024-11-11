import styled from "styled-components"

export const CommonFlexWrapperStyled = styled.div`
  display: flex;
`

export const CommonVerticalFlexWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`

export const CommonPanelWrapperStyled = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  padding: min(2.5%, 1rem) min(5%, 2rem);
  border: 1px solid black;
  overflow: hidden;

  & > h2 {
    font-size: clamp(16px, 1.2vw, 30px);
  }

  & > div {
    max-height: calc(100% - 2rem);
    overflow-y: auto;
  }
`
