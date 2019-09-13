import React, { useContext } from 'react'
import Modal from 'react-modal'
import { WidgetContext } from './store/WidgetContext'
import WidgetSettingsForm from './components/WidgetSettingsForm'

Modal.setAppElement('#root')

export default function EditWidgetModal() {
  const { state, dispatch } = useContext(WidgetContext)
  const { widget, widgetDefinition } = state.modalState

  const cancel = () => {
    dispatch({ type: 'cancel_add_widget' })
  }

  const save = settings => {
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
      <WidgetSettingsForm
        widgetDefinition={widgetDefinition}
        widget={widget}
        onSave={save}
        onCancel={cancel}
      />
    </Modal>
  )
}
