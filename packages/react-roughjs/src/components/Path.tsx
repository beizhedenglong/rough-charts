import * as React from 'react'
import { BaseOptions } from '../baseTypes'
import { useDrawEffect } from '../useDrawEffect'

export interface PathProps extends BaseOptions {
  d?: string
}

export const Path: React.FC<PathProps> = (props) => {
  useDrawEffect('path', [props.d, props.options], props)
  return null
}

Path.displayName = 'Path'
Path.defaultProps = {
  d: '',
}

export default Path
