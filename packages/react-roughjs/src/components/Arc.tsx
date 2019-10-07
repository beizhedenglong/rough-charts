import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface ArcProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number,
  start?: number,
  stop?: number,
  closed?: boolean
}

export const Arc: React.FC<ArcProps> = (props) => {
  useDrawEffect('arc',
    [props.x, props.y, props.width, props.height, props.start,
      props.stop, props.closed, props.options])
  return null
}

Arc.displayName = 'Arc'
Arc.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  start: 0,
  stop: Math.PI / 2,
  closed: false,
}

export default Arc
