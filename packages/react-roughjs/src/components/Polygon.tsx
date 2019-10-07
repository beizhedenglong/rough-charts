import * as React from 'react'
import { BaseOptions, Point } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface PolygonProps extends BaseOptions {
  vertices?: Point[]
}

export const Polygon: React.FC<PolygonProps> = (props) => {
  useDrawEffect('polygon', [props.vertices, props.options])
  return null
}

Polygon.displayName = 'Polygon'
Polygon.defaultProps = {
  vertices: [],
}


export default Polygon
