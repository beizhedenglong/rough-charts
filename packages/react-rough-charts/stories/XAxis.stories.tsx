import * as React from 'react'
import * as d3Scale from 'd3-scale'
import {
  LineSeries, Tooltip,
  ChartProvider, XAxis, YAxis,
} from '../src'
import { colors } from './colors'


export default {
  title: 'XAxis',
  component: XAxis,
}


const data = [
  { name: 'A', value1: -30, value2: -30 },
  { name: 'A', value1: 0, value2: 20 },
  { name: 'D', value1: 40, value2: 15 },
  { name: 'C', value1: 50, value2: 23 },
  { name: 'E', value1: 70, value2: 39 },
  { name: 'B', value1: 90, value2: 17 },
  { name: 'H', value1: 100, value2: 31 },
]

const xScale = d3Scale.scaleLinear().domain([-50, 100])

export const SetStartFrom = props => (
  <ChartProvider
    height={400}
    data={data}
    xScale={xScale}
    {...props}
  >
    <XAxis
      dataKey="value1"
      startFromY={0}
    />
    <YAxis />
    <LineSeries
      dataKey="value2"
      options={{
        stroke: colors[0],
        strokeWidth: 2,
      }}
    />
    <Tooltip>
      {item => `(${item.value1}, ${item.value2})`}
    </Tooltip>
  </ChartProvider>
)
