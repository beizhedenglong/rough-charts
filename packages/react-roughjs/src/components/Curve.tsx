import * as React from 'react'
import { BaseOptions, Point } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface CurveProps extends BaseOptions {
  points?: Point[]
}

export const Curve: React.FC<CurveProps> = (props) => {
  useDrawEffect('curve', [props.points, props.options], props)
  return null
}

Curve.displayName = 'Curve'
Curve.defaultProps = {
  points: [[0, 0]], // NOTE
}

export default Curve
