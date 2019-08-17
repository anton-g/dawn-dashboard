import React, { useEffect } from 'react'
import styled from 'styled-components'

const StyledDemo = styled.div`
  display: flex;
  height: 100%;
  border: 1px dashed palevioletred;
`

export default function RedditSubreddit({ subredditName }) {
  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subredditName}/new.json?sort=new`)
      .then(response => response.json())
      .then(result => console.log(result))
  }, [subredditName])

  return (
    <StyledDemo>
      <h1>{subredditName}</h1>
    </StyledDemo>
  )
}
