import * as React from 'react'
import { withChartProvider } from './withChartProvider'
import { BaseChartProps } from '../baseTypes'

export interface XYProps<T = any> extends BaseChartProps<T> {
  children?: React.ReactNode
}

export const XY = withChartProvider(
  (props: XYProps) => <React.Fragment>{props.children}</React.Fragment>,
)

XY.displayName = 'XY'

export default XY
