import * as React from 'react'
import { BaseOptions, Handlers } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface RectangleProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export const Rectangle: React.FC<RectangleProps> = (props) => {
  const {
    x, y, width, height, options, onClick, onMouseOut, onMouseOver,
  } = props
  const handlers: Handlers = {
    onClick,
    onMouseOver,
    onMouseOut,
  }
  useDrawEffect('rectangle', [
    x, y, width, height, options,
  ], handlers)
  return null
}

Rectangle.displayName = 'Rectangle'
Rectangle.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

export default Rectangle
