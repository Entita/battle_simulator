import { layoutPositions } from "@/types/layout"
import styled, { css } from "styled-components"
import { MapPanelWrapperStyled } from "./MapPanel/MapPanel.style"

export const MainLayoutPanelsWrapperStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr;
`

export const MainLayoutWrapperStyled = styled.div<{ $panelsPosition: layoutPositions }>`
  display: flex;
  height: calc(100% - 33px);
  width: 100%;

  ${({ $panelsPosition }) =>
    $panelsPosition === 'top' || $panelsPosition === 'bottom' ? css`
      // move panels to top/bottom
      flex-direction: ${$panelsPosition === 'top' ? 'column-reverse' : 'column'};

      ${MapPanelWrapperStyled} {
        height: calc(100% - min(50%, 240px));
      }

      ${MainLayoutPanelsWrapperStyled} {
        height: 50%;
        max-height: 240px;
      }

      ${MainLayoutPanelsWrapperStyled} {
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 1fr;

        @media (min-width: 301px) and (max-width: 500px) {
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          max-height: 350px;

          & > div:last-child {
            grid-column: 1/3;
          }
        }

        @media (max-width: 300px) {
          grid-template-columns: 1fr;
          grid-template-rows: 1fr 1fr 1fr;
          max-height: 460px;
        }
      }

    ` : css`
      //move panels to left/right
      flex-direction: ${$panelsPosition === 'left' ? 'row-reverse' : 'row'};

      ${MapPanelWrapperStyled} {
        width: calc(100% - min(50%, 400px));
        height: auto;
      }

      ${MainLayoutPanelsWrapperStyled} {
        width: 50%;
        max-width: 400px;
      }
    `
  }
`
