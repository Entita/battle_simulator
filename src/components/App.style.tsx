import { CommonFlexWrapperStyled } from "@/common/common.style"
import { layoutPositions } from "@/types/layout"
import styled, { css } from "styled-components"
import { MenuBarWrapperStyled } from "./MenuBar/MenuBar.style"

export const AppWrapperStyled = styled(CommonFlexWrapperStyled)<{ $menuBarPosition: layoutPositions }>`
  color: black;
  overflow: hidden;
  height: 100%;
  width: 100%;
  max-width: 100vw;

  ${({ $menuBarPosition }) =>
    $menuBarPosition === 'top' ? css`
      // move menu bar to top
      flex-direction: column;

    ` : $menuBarPosition === 'bottom' ? css`
      // move menu bar to bottom
      flex-direction: column-reverse;

    ` : $menuBarPosition === 'left' ? css`
      //move menu bar to left & change menu items order to column
      flex-direction: row;
      ${MenuBarWrapperStyled} {
        flex-direction: column;
        padding: 1rem;
      }

    ` : css`
      //move menu bar to right & change menu items order to column
      flex-direction: row-reverse;
      ${MenuBarWrapperStyled} {
        flex-direction: column;
        padding: 1rem;
      }
    `
  }
`
