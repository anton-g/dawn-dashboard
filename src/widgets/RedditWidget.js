import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { StyledContainer, Header, Title, EditButton } from '../styles'

export default function RedditWidget({
  subredditName,
  sort,
  time,
  onEditClick
}) {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`https://www.reddit.com/r/${subredditName}/${sort}.json?t=${time}`)
      .then(response => response.json())
      .then(({ data }) => {
        const ps = data.children.map(({ data }) => ({
          id: data.id,
          title: data.title,
          author: data.author,
          href: `https://reddit.com${data.permalink}`
        }))
        setPosts(ps)
        setError(false)
      })
      .catch(() => {
        setError(true)
        setPosts([])
      })
  }, [subredditName, sort, time])

  return (
    <StyledContainer>
      <Header>
        <Title>
          /r/{subredditName} - {sort} - {time}
        </Title>
        <EditButton onClick={onEditClick}>⚙︎</EditButton>
      </Header>
      {error && <Error>Invalid configuration</Error>}
      <PostList>
        {posts.map(p => (
          <Post key={p.id}>
            <a href={p.href}>{p.title}</a>
          </Post>
        ))}
      </PostList>
    </StyledContainer>
  )
}

const PostList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 8px;
`

const Post = styled.li`
  font-size: 16px;
  height: 24px;
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Error = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 24px;
  color: red;
`
