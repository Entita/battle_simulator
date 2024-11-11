import styled from "styled-components"

export const MenuBarWrapperStyled = styled.ul`
  display: flex;
  list-style: none;
  padding: .25rem 1rem;
  column-gap: 1rem;
  row-gap: 1rem;
  border: 2px solid black;
  font-size: clamp(16px, 1vw, 18px);

  li {
    user-select: none;
    cursor: pointer;
  }

  .menu-bar-selected {
    background-color: lightgray;

  }
`
