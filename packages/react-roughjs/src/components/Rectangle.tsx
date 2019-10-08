import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface RectangleProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}

export const Rectangle: React.FC<RectangleProps> = (props) => {
  const {
    x, y, width, height, options,
  } = props
  useDrawEffect('rectangle', [
    x, y, width, height, options,
  ], props)
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
