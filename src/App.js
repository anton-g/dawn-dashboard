import React from 'react'
import { createGlobalStyle } from 'styled-components'
import Layout from './Layout'
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
        <Layout />
      </WidgetProvider>
    </>
  )
}

export default App
