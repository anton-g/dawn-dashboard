import styled from 'styled-components'

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background-color: white;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
`

export const Title = styled.h1`
  font-size: 16px;
  display: inline-block;
`

export const EditButton = styled.button`
  border: none;
`
