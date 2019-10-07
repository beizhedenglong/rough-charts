import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface EllipseProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number
}

export const Ellipse: React.FC<EllipseProps> = ({
  x, y, width, height, options,
}) => {
  useDrawEffect('ellipse', [x, y, width, height, options])
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
