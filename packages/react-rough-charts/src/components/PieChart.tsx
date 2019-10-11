import * as React from 'react'
import { withChartProvider } from './withChartProvider'
import { BaseChartProps } from '../baseTypes'

export interface PieChartProps<T=any> extends BaseChartProps<T> {
  children?: React.ReactNode
}

export const PieChart = withChartProvider((props: PieChartProps) => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
))

PieChart.displayName = 'PieChart'
export default PieChart
