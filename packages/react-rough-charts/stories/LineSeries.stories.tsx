import * as React from 'react'
import { Rectangle } from 'react-roughjs'
import * as d3Shape from 'd3-shape'
import {
  LineSeries, Tooltip,
  ChartProvider, XAxis, YAxis,
} from '../src'
import { colors } from './colors'


export default {
  title: 'LineSeries',
  component: LineSeries,
}

const data = [
  { name: 'A', value1: 30, value2: 35 },
  { name: 'B', value1: 90, value2: 17 },
  { name: 'C', value1: 50, value2: 23 },
  { name: 'D', value1: 40, value2: 15 },
  { name: 'E', value1: 70, value2: 39 },
  { name: 'G', value1: 30, value2: 25 },
  { name: 'H', value1: 100, value2: 31 },
  { name: 'I', value1: 110, value2: 32 },
]

export const Basic = props => (
  <ChartProvider
    height={400}
    data={data}
    {...props}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <LineSeries
      dataKey="value1"
      options={{
        stroke: colors[0],
        strokeWidth: 2,
      }}
    />
    <LineSeries
      dataKey="value2"
      options={{
        stroke: colors[3],
        strokeWidth: 2,
      }}
    />
    <Tooltip />
  </ChartProvider>
)

export const WithCustomizedShape = props => (
  <ChartProvider
    height={400}
    data={data}
    {...props}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <LineSeries
      dataKey="value1"
      options={{
        stroke: colors[0],
        strokeWidth: 2,
      }}
    >
      {
        (item, itemProps, index) => {
          const { x, y } = itemProps

          return (
            <Rectangle
              key={index}
              x={x - 10}
              y={y - 10}
              height={20}
              width={20}
              options={{
                fill: colors[0],
                fillStyle: 'solid',
                stroke: colors[0],
              }}
            />
          )
        }
      }
    </LineSeries>
    <Tooltip />
  </ChartProvider>
)

export const WithCustomizedCurve = (props) => {
  const c1 = d3Shape.curveCatmullRom.alpha(1)
  return (
    <ChartProvider
      height={400}
      data={data}
      {...props}
    >
      <XAxis dataKey="name" />
      <YAxis />
      <LineSeries
        dataKey="value1"
        curve={c1}
        options={{
          stroke: colors[0],
          strokeWidth: 2,
        }}
      />
      <LineSeries
        dataKey="value1"
        options={{
          stroke: colors[3],
          strokeWidth: 2,
        }}
      />
      <Tooltip />
    </ChartProvider>
  )
}
