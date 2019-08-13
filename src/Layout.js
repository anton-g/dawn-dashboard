import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { WidthProvider, Responsive } from 'react-grid-layout'
import Demo from './Demo'
const ResponsiveGridLayout = WidthProvider(Responsive)

const ComponentFactory = widget => {
  switch (widget.type) {
    case 'demo':
      return <Demo {...widget.settings} />
    default:
      throw Error('Incorrect component type')
  }
}

const tempwidgets = [
  {
    key: 'random-key',
    type: 'demo',
    settings: {
      title: 'Foo'
    },
    defaultAppearance: {
      x: 0,
      y: 0,
      w: 3,
      h: 2
    }
  },
  {
    key: 'random-key2',
    type: 'demo',
    settings: {
      title: 'Foo2'
    },
    defaultAppearance: {
      x: 3,
      y: 0,
      w: 2,
      h: 2
    }
  }
]

const StyledRemove = styled.span`
  position: absolute;
  right: 2px;
  top: 0;
  cursor: 'pointer';
`

const getLayouts = widgets => {
  const test = widgets.map(x => ({
    ...x.defaultAppearance,
    i: x.key
  }))
  return {
    lg: test,
    md: test,
    sm: test,
    xs: test,
    xxs: test
  }
}

export default function Layout(props) {
  const [newCounter, setNewCounter] = useState(0)
  const [cols, setCols] = useState()
  const [widgets, setWidgets] = useState([])
  const [layouts, setLayouts] = useState({})

  useEffect(() => {
    // load from ls
    const w = getFromLS('widgets') || tempwidgets
    setWidgets(w)
    const l = getFromLS('layouts') || getLayouts(w)
    setLayouts(l)
  }, [])

  const createElement = widget => {
    return (
      <div key={widget.key}>
        <StyledRemove onClick={() => onRemoveWidget(widget.key)}>
          x
        </StyledRemove>
        {ComponentFactory(widget)}
      </div>
    )
  }

  const onRemoveWidget = key => {
    const updatedWidgets = widgets.filter(x => x.key !== key)
    setWidgets(updatedWidgets)
    saveToLS('widgets', updatedWidgets)
  }

  const onBreakpointChange = (breakpoint, cols) => {
    // setBreakpoint(breakpoint)
    console.log(breakpoint)
    setCols(cols)
  }

  const onLayoutChange = (layout, layouts) => {
    setLayouts(layouts)
    saveToLS('layouts', layouts)
  }

  return (
    <div>
      <button>foo</button>
      <ResponsiveGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
        layouts={layouts}
      >
        {widgets.map(el => createElement(el))}
      </ResponsiveGridLayout>
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
