import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'


export interface CircleProps extends BaseOptions {
  x?: number,
  y?: number,
  diameter?: number
}
export const Circle: React.FC<CircleProps> = (props) => {
  useDrawEffect('circle', [props.x, props.y, props.diameter, props.options])
  return null
}

Circle.displayName = 'Circle'
Circle.defaultProps = {
  x: 0,
  y: 0,
  diameter: 0,
}

export default Circle
