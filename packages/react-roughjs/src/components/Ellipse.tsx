import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface EllipseProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number
}

export const Ellipse: React.FC<EllipseProps> = (props) => {
  const {
    x, y, width, height, options,
  } = props
  useDrawEffect('ellipse', [x, y, width, height, options], props)
  return null
}

Ellipse.displayName = 'Ellipse'
Ellipse.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

export default Ellipse
