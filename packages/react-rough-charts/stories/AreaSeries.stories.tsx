import * as React from 'react'
import {
  YAxis, XAxis, AreaSeries,
  ChartProvider, Tooltip,
} from '../src'
import { colors } from './colors'


export default {
  title: 'AreaSeries',
  component: AreaSeries,
}

const data = [
  {
    name: 'Student A', math: 40, physics: 80, chemistry: 85,
  },
  {
    name: 'Student B', math: 80, physics: 50, chemistry: 65,
  },
  {
    name: 'Student C', math: 95, physics: 77, chemistry: 99,
  },
  {
    name: 'Student D', math: 100, physics: 68, chemistry: 88,
  },
  {
    name: 'Student E', math: 60, physics: 76, chemistry: 67,
  },
  {
    name: 'Student F', math: 75, physics: 77, chemistry: 55,
  },
]

export const Basic = props => (
  <ChartProvider
    data={data}
    height={400}
    {...props}
  >
    <AreaSeries
      dataKey="math"
      options={{ stroke: colors[10] }}
    />
    <YAxis />
    <XAxis
      dataKey="name"
    />
    <Tooltip />
  </ChartProvider>
)

export const Stacked = props => (
  <ChartProvider
    data={data}
    height={400}
    {...props}
  >
    <AreaSeries
      dataKey="math"
      options={{ stroke: colors[6] }}
    />
    <AreaSeries
      dataKey="physics"
      options={{ stroke: colors[7] }}
    />
    <AreaSeries
      dataKey="chemistry"
      options={{ stroke: colors[8] }}
    />
    <YAxis />
    <XAxis
      dataKey="name"
    />
    <Tooltip />
  </ChartProvider>
)
