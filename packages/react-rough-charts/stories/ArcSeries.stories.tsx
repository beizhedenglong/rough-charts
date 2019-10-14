import * as React from 'react'
import {
  ArcSeries, Tooltip,
  ChartProvider, Arc,
} from '../src'
import { colors } from './colors'


export default {
  title: 'ArcSeries',
  component: ArcSeries,
}

const data = [
  { name: 'A', value1: 30, value2: 35 },
  { name: 'B', value1: 40, value2: 17 },
  { name: 'C', value1: 50, value2: 23 },
  { name: 'D', value1: 60, value2: 15 },
  { name: 'E', value1: 70, value2: 39 },
  { name: 'E', value1: 80, value2: 38 },
  { name: 'G', value1: 90, value2: 25 },
  { name: 'H', value1: 100, value2: 31 },
  { name: 'I', value1: 110, value2: 32 },
]

export const Basic = props => (
  <ChartProvider
    height={400}
    data={data}
    margin={{ top: 30 }}
    {...props}
  >
    <ArcSeries
      dataKey="value2"
      padAngle={Math.PI / 20}
      options={{ fill: colors[0] }}
    />
    <Tooltip />
  </ChartProvider>
)

export const TwoLevel = props => (
  <ChartProvider
    height={400}
    data={data}
    margin={{ top: 30 }}
    {...props}
  >
    <ArcSeries
      dataKey="value1"
      innerRadiusPercent={0.8}
    >
      {(item, itemProps, index) => (
        <Arc
          key={index}
          {...itemProps}
          options={{ fill: colors[index % colors.length] }}
        />
      )}
    </ArcSeries>
    <ArcSeries
      dataKey="value2"
      outerRadiusPercent={0.5}
    >
      {(item, itemProps, index) => (
        <Arc
          key={index}
          {...itemProps}
          options={{ fill: colors[index % colors.length] }}
        />
      )}
    </ArcSeries>
    <Tooltip />
  </ChartProvider>
)

export const WithCustomizedShape = props => (
  <ChartProvider
    height={400}
    data={data}
    margin={{ top: 30 }}
    {...props}
  >
    <ArcSeries
      dataKey="value1"
    >
      {
        (item, itemProps, index) => (
          <Arc
            {...itemProps}
            key={index}
            options={{
              fill: colors[index % colors.length],
            }}
            outerRadius={itemProps.outerRadius * 0.3 + index * itemProps.outerRadius * 0.1}
          />
        )
      }
    </ArcSeries>
    <Tooltip />
  </ChartProvider>
)
