import React from 'react'
import Layout from './Layout'
import { WidgetProvider } from './store/WidgetContext'

function App() {
  return (
    <WidgetProvider>
      <Layout />
    </WidgetProvider>
  )
}

export default App
