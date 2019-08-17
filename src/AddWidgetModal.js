import React, { useContext, useState, useEffect } from 'react'
import Modal from 'react-modal'
import { WidgetContext } from './store/WidgetContext'
import WidgetSettingsForm from './components/WidgetSettingsForm'

Modal.setAppElement('#root')

export default function AddWidgetModal() {
  const { state, dispatch } = useContext(WidgetContext)
  const widgetDefinition = state.modalState

  const cancel = () => {
    dispatch({ type: 'cancel_add_widget' })
  }

  const save = settings => {
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
      isOpen={state.showAddWidgetModal}
      onRequestClose={cancel}
      contentLabel={`Add ${widgetDefinition.name} widget modal`}
    >
      <h2>Add widget: {widgetDefinition.name}</h2>
      <WidgetSettingsForm
        widgetDefinition={widgetDefinition}
        onSave={save}
        onCancel={cancel}
      />
    </Modal>
  )
}
