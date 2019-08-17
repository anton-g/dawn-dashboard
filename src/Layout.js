import React, { useState, useContext } from 'react'
import { WidthProvider } from 'react-grid-layout'
import { WidgetContext } from './store/WidgetContext'
import AddWidgetModal from './AddWidgetModal'
import ResponsiveGridWorkAround from './ResponsiveGridWorkAround'
import EditWidgetModal from './EditWidgetModal'
import { getWidgetComponent } from './componentFactory'
import Toolbar from './Toolbar'
const ResponsiveGridLayout = WidthProvider(ResponsiveGridWorkAround)

const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }

export default function Layout(props) {
  const { state, dispatch } = useContext(WidgetContext)
  const [cols, setCols] = useState()

  const createElement = widget => {
    return <div key={widget.key}>{getWidgetComponent(widget, dispatch)}</div>
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
      <Toolbar
        onAddWidget={type => dispatch({ type: 'add_widget', payload: type })}
        onReset={() => dispatch({ type: 'reset' })}
      />
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
      <AddWidgetModal />
      <EditWidgetModal />
    </div>
  )
}
