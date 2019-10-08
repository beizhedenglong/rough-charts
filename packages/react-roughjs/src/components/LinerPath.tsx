import * as React from 'react'
import { BaseOptions, Point } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface LinearPathProps extends BaseOptions {
  points?: Point[]
}

export const LinearPath: React.FC<LinearPathProps> = (props) => {
  useDrawEffect('linearPath', [props.points, props.options], props)
  return null
}

LinearPath.displayName = 'LinearPath'
LinearPath.defaultProps = {
  points: [],
}

export default LinearPath
