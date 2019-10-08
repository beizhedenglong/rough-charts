import * as React from 'react'
import { withChartProvider } from './withChartProvider'
import { BaseChartProps } from '../baseTypes'

export interface PieChartProps<T> extends BaseChartProps<T> {

}

export const PieChart = withChartProvider(props => (
  <React.Fragment>
    {props.children}
  </React.Fragment>
))

PieChart.displayName = 'PieChart'
export default PieChart
