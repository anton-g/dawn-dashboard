import React from 'react'
import styled from 'styled-components'

const StyledDemo = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  border: 1px dashed palevioletred;

  h1 {
    margin: 0;
    padding: 0;
  }
`

export default function Demo({ title }) {
  return (
    <StyledDemo>
      <h1>{title}</h1>
    </StyledDemo>
  )
}
