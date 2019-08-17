import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const SettingsForm = styled.form`
  display: flex;
  flex-direction: column;
`

export default function WidgetSettingsForm({
  widget,
  widgetDefinition,
  onSave,
  onCancel
}) {
  const [settings, setSettings] = useState({})

  useEffect(() => {
    let defaultSettings = {}
    if (widget) {
      defaultSettings = widget.settings
    }

    if (!widget && widgetDefinition.settings) {
      defaultSettings = Object.entries(widgetDefinition.settings)
        .filter(([key, setting]) => setting.type === 'select')
        .reduce((result, [key, setting]) => {
          result[key] = setting.options.find(x => x.default).value
          return result
        }, {})
    }
    setSettings(defaultSettings)
  }, [widgetDefinition, widget, setSettings])

  return (
    <SettingsForm>
      {widgetDefinition.settings &&
        Object.entries(widgetDefinition.settings).map(([key, s]) =>
          getSettingInput(key, s, settings[key], v => {
            settings[key] = v
            setSettings({ ...settings })
          })
        )}
      <button onClick={onCancel}>Cancel</button>
      <button onClick={() => onSave(settings)}>Save</button>
    </SettingsForm>
  )
}

const getSettingInput = (key, setting, value, cb) => {
  console.log(setting)
  switch (setting.type) {
    case 'text':
      return (
        <label key={key}>
          {setting.name}:{' '}
          <input defaultValue={value} onChange={e => cb(e.target.value)} />
        </label>
      )
    case 'select':
      return (
        <label key={key}>
          {setting.name}:{' '}
          <select
            value={value || setting.options.find(x => x.default).value}
            onChange={e => cb(e.target.value)}
          >
            {setting.options.map(o => (
              <option key={o.value} value={o.value}>
                {o.value}
              </option>
            ))}
          </select>
        </label>
      )
    default:
      throw Error(
        `Incorrect setting type specified in widget definition: ${setting.type}`
      )
  }
}
