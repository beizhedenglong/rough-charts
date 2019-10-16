import * as React from 'react'
import { Circle } from 'react-roughjs'
import * as d3Scale from 'd3-scale'
import {
  YAxis, XAxis, CircleSeries,
  ChartProvider, Tooltip,
} from '../src'
import { colors } from './colors'

export default {
  title: 'CircleSeries',
  component: CircleSeries,
}

const data = [
  { height: 150, weight: 153 },
  { height: 151, weight: 116 },
  { height: 150, weight: 120 },
  { height: 152, weight: 172 },
  { height: 160, weight: 66 },
  { height: 165, weight: 219 },
  { height: 170, weight: 117 },
  { height: 175, weight: 77 },
  { height: 180, weight: 205 },
  { height: 185, weight: 126 },
  { height: 182, weight: 134 },
  { height: 164, weight: 179 },
]

export const Basic = props => (
  <ChartProvider
    xScale={d3Scale.scaleLinear().domain([120, 200])}
    data={data}
    height={400}
    {...props}
  >
    <YAxis dataKey="weight" format={tick => `${tick} kg`} />
    <XAxis dataKey="height" format={tick => `${tick} cm`} />
    <CircleSeries
      dataKey="weight"
    >
      {(item, itemProps, index) => (
        <Circle
          key={index}
          {...itemProps}
          diameter={10 + index * 5}
          options={{
            fill: colors[index % colors.length],
          }}
        />
      )}

    </CircleSeries>
    <Tooltip />
  </ChartProvider>
)
