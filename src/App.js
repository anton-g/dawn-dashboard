import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Main from './Main'
import { WidgetProvider } from './store/WidgetContext'

const GlobalStyle = createGlobalStyle`  
  body {
    background-color: #F8F8F8;
    margin: 0;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <WidgetProvider>
        <Main />
      </WidgetProvider>
    </>
  )
}

export default App
