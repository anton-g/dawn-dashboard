import React, { useReducer } from 'react'
import widgetDefinitions from './widgets/widgetDefinitions'

const tempWidgets = [
  // {
  //   key: 'random-key',
  //   type: 'demo',
  //   settings: {
  //     title: 'Foo'
  //   },
  //   appearance: {
  //     x: 0,
  //     y: 0,
  //     w: 3,
  //     h: 2
  //   }
  // },
  // {
  //   key: 'random-key2',
  //   type: 'demo',
  //   settings: {
  //     title: 'Foo2'
  //   },
  //   appearance: {
  //     x: 3,
  //     y: 0,
  //     w: 2,
  //     h: 2
  //   }
  // }
]

const initialWidgets = getFromLS('widgets') || tempWidgets
const initialLayouts = getFromLS('layouts') || tempGetLayouts(initialWidgets)

const initialState = {
  widgets: initialWidgets,
  layouts: initialLayouts,
  showWidgetSettingsModal: false,
  widgetSettingsModalState: {},
  breakpoint: undefined
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
    case 'set_breakpoint':
      return {
        ...state,
        breakpoint: payload
      }
    case 'add_widget':
      return {
        ...state,
        showWidgetSettingsModal: true,
        widgetSettingsModalState: widgetDefinitions.find(
          x => x.type === payload
        )
      }
    case 'cancel_add_widget':
      return {
        ...state,
        showWidgetSettingsModal: false,
        widgetSettingsModalState: {}
      }
    case 'save_widget':
      const widget = {
        key: payload.type + Math.random(), // todo guid
        type: payload.type,
        settings: payload.settings
      }
      const updatedWidgets = [...state.widgets, widget]
      saveToLS('widgets', updatedWidgets)

      const layout = {
        ...widgetDefinitions.find(x => x.type === payload.type).defaultLayout,
        i: widget.key
      }

      const updatedLayouts = { ...state.layouts }
      updatedLayouts[state.breakpoint] = [
        ...updatedLayouts[state.breakpoint],
        layout
      ]
      saveToLS('layouts', updatedLayouts)

      return {
        ...state,
        showWidgetSettingsModal: false,
        widgetSettingsModalState: {},
        widgets: updatedWidgets,
        layouts: updatedLayouts
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
  if (global.localStorage) {
    try {
      return JSON.parse(global.localStorage.getItem(key))
    } catch (e) {
      /*Ignore*/
    }
  }
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(key, JSON.stringify(value))
  }
}

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
