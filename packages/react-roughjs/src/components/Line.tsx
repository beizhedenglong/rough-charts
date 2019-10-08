import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'


export interface LineProps extends BaseOptions {
  x1?: number,
  x2?: number,
  y1?: number,
  y2?: number,
}

export const Line: React.FC<LineProps> = (props) => {
  const {
    x1, x2, y1, y2, options,
  } = props
  useDrawEffect('line', [x1, y1, x2, y2, options], props)
  return null
}

Line.displayName = 'Line'
Line.defaultProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
}

export default Line
