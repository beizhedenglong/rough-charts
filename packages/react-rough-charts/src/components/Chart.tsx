import * as React from 'react'
import { withChartProvider } from './withChartProvider'


export const Chart = withChartProvider(props => (
  <>
    {props.children}
  </>
))

export default Chart
