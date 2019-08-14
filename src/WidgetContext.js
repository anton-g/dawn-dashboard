import React, { useReducer } from 'react'

const tempWidgets = [
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

const initialWidgets = getFromLS('widgets') || tempWidgets
const initialLayouts = getFromLS('layouts') || tempGetLayouts(initialWidgets)

const initialState = {
  widgets: initialWidgets,
  layouts: initialLayouts
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'close_widget':
      return {
        ...state,
        widgets: state.widgets.filter(x => x.key !== payload)
      }
    case 'set_layouts':
      saveToLS('layouts', payload)
      return {
        ...state,
        layouts: payload
      }
    default:
      throw new Error(`Invalid type: ` + type)
  }
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

const tempGetLayouts = widgets => {
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
