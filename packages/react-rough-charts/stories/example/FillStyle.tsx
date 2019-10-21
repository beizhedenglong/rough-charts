import * as React from 'react'
import { Rectangle } from 'react-roughjs'
import {
  Tooltip, BarSeries,
  ChartProvider, XAxis, YAxis,
} from '../../src'
import { colors } from '../colors'

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

const fillStyles = ['hachure', 'solid', 'zigzag', 'cross-hatch', 'dots', 'sunburst', 'dashed', 'zigzag-line']
export const FillStyle = props => (
  <ChartProvider
    height={400}
    width={props.width}
    data={data}
    {...props}
  >
    <XAxis dataKey="name" />
    <YAxis />
    <BarSeries
      dataKey="value1"
    >
      {(item, ItemProps, index) => (
        <Rectangle
          {...ItemProps}
          key={index}
          options={{
            fillStyle: fillStyles[index % fillStyles.length] as any,
            fill: colors[0],
          }}
        />
      )}
    </BarSeries>
    <Tooltip />
  </ChartProvider>
)
