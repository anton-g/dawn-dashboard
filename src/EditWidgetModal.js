import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { WidgetContext } from './store/WidgetContext'

Modal.setAppElement('#root')

export default function EditWidgetModal() {
  const { state, dispatch } = useContext(WidgetContext)
  const { widget, widgetDefinition } = state.modalState
  const [settings, setSettings] = useState({})
  useEffect(() => {
    setSettings({})
  }, [widgetDefinition, setSettings])

  const cancel = () => {
    dispatch({ type: 'cancel_add_widget' })
  }

  const save = () => {
    // todo validation
    dispatch({
      type: 'save_edit_widget',
      payload: {
        ...widget,
        settings: settings
      }
    })
  }

  if (!widget || !widgetDefinition) return null

  return (
    <Modal
      isOpen={state.showEditWidgetModal}
      onRequestClose={cancel}
      contentLabel={`Edit ${widgetDefinition.name} widget modal`}
    >
      <h2>Edit "{widgetDefinition.name}" widget</h2>
      {widgetDefinition.settings && (
        <form>
          {Object.entries(widgetDefinition.settings).map(([key, s]) =>
            getSettingInput(key, s, widget.settings[key], v => {
              settings[key] = v
              setSettings(settings)
            })
          )}
        </form>
      )}
      <button onClick={cancel}>Cancel</button>
      <button onClick={save}>Save</button>
    </Modal>
  )
}

const getSettingInput = (key, setting, value, cb) => {
  switch (setting.type) {
    case 'text':
      return (
        <label key={key}>
          {setting.name}:{' '}
          <input defaultValue={value} onChange={e => cb(e.target.value)} />
        </label>
      )
    default:
      throw Error(
        `Incorrect setting type specified in widget definition: ${setting.type}`
      )
  }
}
