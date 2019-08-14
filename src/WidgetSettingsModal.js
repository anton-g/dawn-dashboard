import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { WidgetContext } from './WidgetContext'

Modal.setAppElement('#root')

export default function WidgetSettingsModal() {
  const { state, dispatch } = useContext(WidgetContext)
  const widgetDefinition = state.widgetSettingsModalState
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
      type: 'save_widget',
      payload: {
        type: widgetDefinition.type,
        settings: settings
      }
    })
  }

  return (
    <Modal
      isOpen={state.showWidgetSettingsModal}
      onRequestClose={cancel}
      contentLabel={`Add ${widgetDefinition.name} widget modal`}
    >
      <h2>Add widget: {widgetDefinition.name}</h2>
      {widgetDefinition.settings && (
        <form>
          {Object.entries(widgetDefinition.settings).map(([key, s]) =>
            getSettingInput(key, s, v => {
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

const getSettingInput = (key, setting, cb) => {
  switch (setting.type) {
    case 'text':
      return (
        <label key={key}>
          {setting.name}: <input onChange={e => cb(e.target.value)} />
        </label>
      )
    default:
      throw Error(
        `Incorrect setting type specified in widget definition: ${setting.type}`
      )
  }
}
