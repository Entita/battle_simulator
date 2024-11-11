import { CommonFlexWrapperStyled, CommonPanelWrapperStyled, CommonVerticalFlexWrapperStyled } from "@/common/common.style"
import styled from "styled-components"

export const ControlsPanelWrapperStyled = styled(CommonPanelWrapperStyled)`

`

export const ControlsContentWrapperStyled = styled(CommonVerticalFlexWrapperStyled)`
  margin-top: auto;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;

  span {
    font-size: clamp(16px, 1.5vw, 21px);
  }

  h3 {
    font-weight: bold;
    font-size: clamp(26px, 2.1vw, 32px);
    letter-spacing: 1px;
  }
`

export const ControlsWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border: 1px solid black;
  width: 90%;
  max-width: 160px;
`

export const ControlStyled = styled(CommonFlexWrapperStyled)`
  justify-content: center;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    filter: brightness(.8);
  }
`