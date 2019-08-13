import React, { useState } from 'react'
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

const widgets = [
  {
    key: 'random-key',
    type: 'demo',
    settings: {
      title: 'Foo'
    },
    appearance: {
      x: 0,
      y: 0,
      w: 2,
      h: 2
    }
  }
]

export default function Layout(props) {
  const [newCounter, setNewCounter] = useState(0)
  const [cols, setCols] = useState()
  const [items, setItems] = useState(widgets)

  const createElement = widget => {
    return (
      <div key={widget.key} data-grid={widget.appearance}>
        {ComponentFactory(widget)}
      </div>
    )
  }

  const onAddItem = () => {
    /*eslint no-console: 0*/
    console.log('adding', 'n' + newCounter)
    setItems(
      items.concat({
        i: 'n' + newCounter,
        x: (items.length * 2) % (cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      })
    )
    setNewCounter(c => c + 1)
  }

  const onBreakpointChange = (breakpoint, cols) => {
    // setBreakpoint(breakpoint)
    setCols(cols)
  }

  const onLayoutChange = layout => {
    // this.props.onLayoutChange(layout);
    // setLayout(layout)
  }

  const onRemoveItem = i => {
    console.log('removing', i)
    setItems(itms => itms.filter(item => item.i !== i))
  }

  return (
    <div>
      <button onClick={onAddItem}>Add Item</button>
      <ResponsiveGridLayout
        onLayoutChange={onLayoutChange}
        onBreakpointChange={onBreakpointChange}
        className="layout"
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={100}
      >
        {items.map(el => createElement(el))}
      </ResponsiveGridLayout>
    </div>
  )
}
