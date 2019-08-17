import React, { useState, useEffect, useContext } from 'react'
import { WidthProvider, Responsive } from 'react-grid-layout'
import Demo from './Demo'
import { WidgetContext } from './WidgetContext'
import WidgetSettingsModal from './WidgetSettingsModal'
const ResponsiveGridLayout = WidthProvider(Responsive)

const ComponentFactory = widget => {
  switch (widget.type) {
    case 'demo':
      return <Demo {...widget.settings} />
    default:
      throw Error('Incorrect component type')
  }
}

export default function Layout(props) {
  const { state, dispatch } = useContext(WidgetContext)
  const [cols, setCols] = useState()

  const createElement = widget => {
    return <div key={widget.key}>{ComponentFactory(widget)}</div>
  }

  const onBreakpointChange = (breakpoint, cols) => {
    // setBreakpoint(breakpoint)
    console.log(breakpoint)
    setCols(cols)
  }

  const onLayoutChange = (layout, layouts) => {
    dispatch({ type: 'set_layouts', payload: layouts })
  }

  return (
    <div>
      <select
        value="disabled"
        onChange={e => {
          dispatch({ type: 'add_widget', payload: e.target.value })
          e.target.value = 'disabled'
        }}
      >
        <option disabled value="disabled">
          Add new widget
        </option>
        <option value="demo">Demo</option>
      </select>
      <ResponsiveGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        layouts={state.layouts}
      >
        {state.widgets.map(el => createElement(el))}
      </ResponsiveGridLayout>
      <WidgetSettingsModal />
    </div>
  )
}

function getFromLS(key) {
  let ls = {}
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem(key))
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value))
  }
}
