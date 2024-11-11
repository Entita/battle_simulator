'use client'

import Link from 'next/link'
import styled from 'styled-components'

export const ErrorWrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  row-gap: 6px;

  a, button {
    padding: 4px 6px;
    border: 1px solid rgb(var(--foreground));
    border-radius: 4px;
    transition: opacity .2s ease;

    &:hover {
      opacity: .8;
    }
  }
`

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <ErrorWrapperStyled>
          <h2>Page was not found</h2>
          <p>Failed to find the desired resource.</p>
          <Link href="/">Back to main page</Link>
        </ErrorWrapperStyled>
      </body>
    </html>
  )
}