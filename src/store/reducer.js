import widgetDefinitions from '../widgets/widgetDefinitions'
import { saveToLS } from '../utils'

export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'close_widget':
      return removeWidget(payload)
    case 'set_layouts':
      return setLayouts(payload)
    case 'set_breakpoint':
      return setBreakpoint(payload)
    case 'add_widget':
      return addWidget(payload)
    case 'remove_widget':
      return removeWidget(payload)
    case 'cancel_add_widget':
      return cancelAddWidget()
    case 'save_widget':
      return saveWidget(payload)
    case 'edit_widget':
      return editWidget(payload)
    case 'save_edit_widget':
      return saveEditWidget(payload)
    case 'reset':
      return reset()
    default:
      throw new Error(`Invalid type: ` + type)
  }

  function reset() {
    saveToLS('widgets', [])
    saveToLS('layouts', {})
    return {
      ...state,
      widgets: [],
      layouts: {}
    }
  }

  function setLayouts(layouts) {
    saveToLS('layouts', layouts)
    return {
      ...state,
      layouts: layouts
    }
  }

  function setBreakpoint(breakpoint) {
    return {
      ...state,
      breakpoint: breakpoint
    }
  }

  function addWidget(widgetType) {
    return {
      ...state,
      showAddWidgetModal: true,
      modalState: widgetDefinitions.find(x => x.type === widgetType)
    }
  }

  function removeWidget(widgetKey) {
    const updatedWidgets = state.widgets.filter(x => x.key !== widgetKey)
    saveToLS('widgets', updatedWidgets)

    return {
      ...state,
      widgets: updatedWidgets
    }
  }

  function cancelAddWidget() {
    return {
      ...state,
      showAddWidgetModal: false,
      modalState: {}
    }
  }

  function saveWidget(widgetOptions) {
    const widget = {
      key: widgetOptions.type + Math.random(), // todo guid
      type: widgetOptions.type,
      settings: widgetOptions.settings
    }
    const updatedWidgets = [...state.widgets, widget]
    saveToLS('widgets', updatedWidgets)

    const layout = {
      ...widgetDefinitions.find(x => x.type === widgetOptions.type)
        .defaultLayout,
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
      showAddWidgetModal: false,
      modalState: {},
      widgets: updatedWidgets,
      layouts: updatedLayouts
    }
  }

  function editWidget(widgetKey) {
    const widget = state.widgets.find(x => x.key === widgetKey)
    const widgetDefinition = widgetDefinitions.find(x => x.type === widget.type)

    return {
      ...state,
      showEditWidgetModal: true,
      modalState: { widget: widget, widgetDefinition: widgetDefinition }
    }
  }

  function saveEditWidget(widget) {
    const updatedWidgets = [...state.widgets]
    const idx = updatedWidgets.findIndex(x => x.key === widget.key)
    updatedWidgets[idx] = widget

    saveToLS('widgets', updatedWidgets)
    return {
      ...state,
      widgets: updatedWidgets,
      showEditWidgetModal: false,
      modalState: {}
    }
  }
}
