import React from 'react'
import styled from 'styled-components'
import widgetDefinitions from './widgets/widgetDefinitions'

const StyledToolbar = styled.div`
  background-color: white;
  padding: 4px;
  border-bottom: 1px solid hsla(0, 0%, 0%, 0.1);
  display: flex;
  justify-content: flex-end;
  align-items: center;

  * {
    margin-right: 8px;
  }
`

const AppTitle = styled.div`
  font-size: 14px;
  margin-right: auto;
  margin-left: 8px;
`

export default function Toolbar({ onAddWidget, onReset }) {
  return (
    <StyledToolbar>
      <AppTitle>dawn</AppTitle>
      <select
        value="disabled"
        onChange={e => {
          onAddWidget(e.target.value)
          e.target.value = 'disabled'
        }}
      >
        <option disabled value="disabled">
          Add new widget
        </option>
        {widgetDefinitions.map(w => (
          <option key={w.type} value={w.type}>
            {w.name}
          </option>
        ))}
      </select>
      <button onClick={onReset}>reset</button>
    </StyledToolbar>
  )
}
