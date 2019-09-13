import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

export default function RedditWidget({
  subredditName,
  sort,
  time,
  onEditClick
}) {
  const [posts, setPosts] = useState([])

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
      })
  }, [subredditName, sort, time])

  return (
    <StyledContainer>
      <Header>
        <Title>/r/{subredditName}</Title>
        <EditButton onClick={onEditClick}>⚙︎</EditButton>
      </Header>
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

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: white;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
`

const Title = styled.h1`
  font-size: 16px;
  display: inline-block;
`

const EditButton = styled.button`
  border: none;
`

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
