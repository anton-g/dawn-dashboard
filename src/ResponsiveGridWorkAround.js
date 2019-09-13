import React, { useEffect, useContext, useRef, useCallback } from 'react'
import { Responsive } from 'react-grid-layout'
import { WidgetContext } from './store/WidgetContext'

export default function ResponsiveGridWorkAround(props) {
  const gridRef = useRef(React.createRef())
  const { dispatch } = useContext(WidgetContext)

  const memoizedCallback = useCallback(() => {
    // Since RGL doesn't provide the initial breakpoint we have to select it ourselves
    const breakpoint = getBreakpointFromWidth(props.breakpoints, props.width)
    dispatch({ type: 'set_breakpoint', payload: breakpoint })
  }, [dispatch, props.breakpoints, props.width])

  useEffect(() => {
    memoizedCallback()
  }, [memoizedCallback])

  return (
    <Responsive ref={gridRef} {...props}>
      {props.children}
    </Responsive>
  )
}

function sortBreakpoints(breakpoints) {
  const keys = Object.keys(breakpoints)
  return keys.sort(function(a, b) {
    return breakpoints[a] - breakpoints[b]
  })
}

function getBreakpointFromWidth(breakpoints, width) {
  const sorted = sortBreakpoints(breakpoints)
  let matching = sorted[0]
  for (let i = 1, len = sorted.length; i < len; i++) {
    const breakpointName = sorted[i]
    if (width > breakpoints[breakpointName]) matching = breakpointName
  }
  return matching
}
