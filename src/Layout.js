import React, { useState, useEffect, useContext, useRef } from 'react'
import { WidthProvider } from 'react-grid-layout'
import Demo from './widgets/Demo'
import { WidgetContext } from './WidgetContext'
import WidgetSettingsModal from './WidgetSettingsModal'
import widgetDefinitions from './widgets/widgetDefinitions'
import RedditSubreddit from './widgets/RedditSubreddit'
import ResponsiveGridWorkAround from './ResponsiveGridWorkAround'
const ResponsiveGridLayout = WidthProvider(ResponsiveGridWorkAround)

const ComponentFactory = widget => {
  switch (widget.type) {
    case 'demo':
      return <Demo {...widget.settings} />
    case 'reddit-subreddit':
      return <RedditSubreddit {...widget.settings} />
    default:
      throw Error('Incorrect component type')
  }
}

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

export default function Layout(props) {
  const { state, dispatch } = useContext(WidgetContext)
  const [cols, setCols] = useState()

  const createElement = widget => {
    return (
      <div key={widget.key} data-grid-minh={5}>
        {ComponentFactory(widget)}
      </div>
    )
  }

  const onBreakpointChange = (breakpoint, cols) => {
    dispatch({ type: 'set_breakpoint', payload: breakpoint })
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
        {widgetDefinitions.map(w => (
          <option key={w.type} value={w.type}>
            {w.name}
          </option>
        ))}
      </select>
      <ResponsiveGridLayout
        measureBeforeMount={true}
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        onWidthChange={e => console.log(e)}
        breakpoints={breakpoints}
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
