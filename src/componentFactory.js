import React from 'react'
import RedditWidget from './widgets/RedditWidget'
import Demo from './widgets/Demo'

export const getWidgetComponent = (widget, dispatch) => {
  const edit = key => dispatch({ type: 'edit_widget', payload: key })

  switch (widget.type) {
    case 'demo':
      return <Demo {...widget.settings} onEditClick={() => edit(widget.key)} />
    case 'reddit':
      return (
        <RedditWidget
          {...widget.settings}
          onEditClick={() => edit(widget.key)}
        />
      )
    default:
      throw Error('Incorrect component type')
  }
}
