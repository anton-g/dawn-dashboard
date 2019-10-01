import React from 'react'
import RedditWidget from './widgets/RedditWidget'
import RssWidget from './widgets/RssWidget'

export const getWidgetComponent = (widget, dispatch) => {
  const edit = key => dispatch({ type: 'edit_widget', payload: key })

  switch (widget.type) {
    case 'reddit':
      return (
        <RedditWidget
          {...widget.settings}
          onEditClick={() => edit(widget.key)}
        />
      )
    case 'rss':
      return (
        <RssWidget
          {...widget.settings}
          onEditClick={() => edit(widget.key)}
        ></RssWidget>
      )
    default:
      throw Error('Incorrect component type')
  }
}
