import React, { useState, useEffect } from 'react'
import Parser from 'rss-parser'
import styled from 'styled-components'
import { StyledContainer, Header, Title, EditButton } from '../styles'

const parser = new Parser()
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/'

export default function RssWidget({ url, onEditClick }) {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('Loading..')
  const [error, setError] = useState(false)

  useEffect(() => {
    parser
      .parseURL(CORS_PROXY + url)
      .then(feed => {
        setTitle(feed.title)
        setItems(feed.items)
        setError(false)
        console.log(feed.items)
      })
      .catch(() => {
        setError(true)
        setItems([])
      })
  }, [url])

  return (
    <StyledContainer>
      <Header>
        <Title>{title}</Title>
        <EditButton onClick={onEditClick}>⚙︎</EditButton>
      </Header>
      {error && <Error>Invalid configuration</Error>}
      <ItemList>
        {items.map(p => (
          <Item key={p.id}>
            <a href={p.link}>{p.title}</a>
          </Item>
        ))}
      </ItemList>
    </StyledContainer>
  )
}

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 8px;
`

const Item = styled.li`
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
