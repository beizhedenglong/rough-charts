import * as React from 'react'
import { Path } from 'react-roughjs'
import {
  YAxis, XAxis, BarSeries, Rectangle, Tooltip,
  ChartProvider,
} from '../src'
import { colors } from './colors'

export default {
  title: 'BarSeries',
  component: BarSeries,
}
const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 3398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
]
export const Basic = props => (
  <ChartProvider
    data={data}
    height={400}
    {...props}
  >
    <YAxis />
    <XAxis dataKey="name" />
    <BarSeries dataKey="pv" options={{ fill: colors[0] }} />
    <BarSeries dataKey="uv" options={{ fill: colors[1] }} />
    <BarSeries dataKey="amt" options={{ fill: colors[2] }} />
    <Tooltip />
  </ChartProvider>
)
Basic.story = {
  title: 'basic',
}

export const WithEventHandler = (props) => {
  const [activeIndex, setIndex] = React.useState(-1)
  return (
    <ChartProvider
      data={data}
      height={400}
      {...props}
    >
      <YAxis />
      <XAxis dataKey="name" />
      <BarSeries
        dataKey="pv"
        options={{ fill: colors[0] }}
      >
        {
          (item, itemProps, index) => (
            <Rectangle
              key={index}
              {...itemProps}
              onMouseOver={() => {
                setIndex(index)
              }}
              options={{
                ...itemProps.options,
                fillStyle: activeIndex === index ? 'solid' : undefined,
              }}
              onMouseOut={() => setIndex(-1)}
            />
          )
        }
      </BarSeries>
      <Tooltip />
    </ChartProvider>
  )
}


export const WithCustomizedShape = props => (
  <ChartProvider
    data={data}
    height={400}
    width={props.width}
  >
    <YAxis />
    <XAxis dataKey="name" />
    <BarSeries
      dataKey="pv"
      options={{ fill: colors[1] }}
    >
      {
        (item, {
          x, y, width, height,
        }, index) => (
          <Path
            key={index}
            d={`M ${x} ${y} L ${x} ${y + height} L ${x + width} ${y + height} Z`}
            options={{
              fill: colors[8],
              fillStyle: 'cross-hatch',
            }}
          />
        )
      }
    </BarSeries>
    <Tooltip />
  </ChartProvider>
)
