import React, { useReducer } from 'react'
import reducer from './reducer'
import { getFromLS } from '../utils'

const initialWidgets = getFromLS('widgets') || []
const initialLayouts = getFromLS('layouts') || tempGetLayouts(initialWidgets)

const initialState = {
  widgets: initialWidgets,
  layouts: initialLayouts,
  showAddWidgetModal: false,
  showEditWidgetModal: false,
  modalState: {},
  breakpoint: undefined
}

const WidgetContext = React.createContext(initialState)

function WidgetProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WidgetContext.Provider>
  )
}
export { WidgetContext, WidgetProvider }

function tempGetLayouts(widgets) {
  const test = widgets.map(x => ({
    ...x.appearance,
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
