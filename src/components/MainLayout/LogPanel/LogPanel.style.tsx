import { CommonPanelWrapperStyled } from "@/common/common.style"
import styled from "styled-components"

export const LogPanelWrapperStyled = styled(CommonPanelWrapperStyled)`
  div {
    display: flex;
    flex-direction: column;
    row-gap: min(3%, .6rem);
    font-size: clamp(16px, 1vw, 18px);
    height: 100%;
  }
`
