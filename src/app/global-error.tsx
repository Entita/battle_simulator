'use client'
import { ErrorWrapperStyled } from './not-found'

export default function GlobalError({ reset }: { reset: Function }) {
  return (
    <html lang="en">
      <body>
        <ErrorWrapperStyled>
          <h2>Something went wrong!</h2>
          <button onClick={() => reset()}>Try again</button>
        </ErrorWrapperStyled>
      </body>
    </html>
  )
}