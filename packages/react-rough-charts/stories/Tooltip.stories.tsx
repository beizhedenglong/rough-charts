import * as React from 'react'
import { Circle } from 'react-roughjs'
import {
  YAxis, XAxis, BarSeries, Tooltip,
  ChartProvider,
} from '../src'
import { colors } from './colors'

export default {
  title: 'Tooltip',
  component: Tooltip,
}
const data = [
  {
    name: 'Student A', math: 90, physics: 80, chemistry: 85,
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
export const WithCustomizedStringContent = props => (
  <ChartProvider
    data={data}
    height={400}
    {...props}
  >
    <YAxis />
    <XAxis dataKey="name" />
    <BarSeries dataKey="physics" options={{ fill: colors[0] }} />
    <Tooltip>
      {({ name, physics }) => `${name} Physics: ${physics}`}
    </Tooltip>
  </ChartProvider>
)

export const Advanced = (props) => {
  const width = 150
  const height = 100
  const renderToolTip = (activeItem) => {
    const {
      name, physics, chemistry, math,
    } = activeItem
    const renderTooltipItem = (x, y, s, color) => (
      <React.Fragment>

        <Circle
          x={x}
          y={y}
          diameter={20}
          options={{ fill: color, fillStyle: 'solid' }}
        />
        <text
          x={x + 20}
          y={y + 6}
          stroke="black"
          fill="black"
        >
          {s}
        </text>
      </React.Fragment>
    )

    return (
      <React.Fragment>
        <text
          x={width / 2}
          y={20}
          textAnchor="middle"
          stroke="black"
          fill="black"
        >
          {name}
        </text>
        {renderTooltipItem(20, 35, `physics: ${physics}`, colors[0])}
        {renderTooltipItem(20, 35 + 22, `chemistry: ${chemistry}`, colors[1])}
        {renderTooltipItem(20, 35 + 22 * 2, `math: ${math}`, colors[2])}
      </React.Fragment>
    )
  }
  return (
    <ChartProvider
      data={data}
      height={400}
      {...props}
    >
      <YAxis />
      <XAxis dataKey="name" />
      <BarSeries dataKey="physics" options={{ fill: colors[0] }} />
      <BarSeries dataKey="chemistry" options={{ fill: colors[1] }} />
      <BarSeries dataKey="math" options={{ fill: colors[2] }} />
      <Tooltip
        width={width}
        height={height}
      >
        {renderToolTip}
      </Tooltip>
    </ChartProvider>
  )
}
