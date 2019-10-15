import * as React from 'react'
import * as d3Scale from 'd3-scale'
import {
  YAxis, XAxis, LineSeries,
  ChartProvider, Tooltip,
} from 'rough-charts'
import { colors } from './colors'


export default {
  title: 'ChartProvider',
  component: ChartProvider,
}

export const WithCustomizedScale = (props) => {
  const data = [
    { date: '2019-10-1', temperature: 30 },
    { date: '2019-10-2', temperature: 33 },
    { date: '2019-10-3', temperature: 31 },
    { date: '2019-10-4', temperature: 36 },
    { date: '2019-10-5', temperature: 37 },
    { date: '2019-10-6', temperature: 30 },
    { date: '2019-10-7', temperature: 31 },
    { date: '2019-10-8', temperature: 25 },
    { date: '2019-10-9', temperature: 35 },
  ]
  const newData = data.map(({ date, temperature }) => {
    const [year, month, day] = date.split('-')
    return ({
      date: new Date(+year, +month, +day),
      temperature,
    })
  })

  const xScale = d3Scale
    .scaleTime()
    .domain([new Date(2019, 10, 1), new Date(2019, 10, 10)])

  const yScale = d3Scale
    .scaleLinear()
    .domain([20, 40])

  const dateString = (d: Date) => `${d.getMonth() + 1}-${d.getDate()}`

  return (
    <ChartProvider
      margin={{
        right: 100,
      }}
      // If xScale/yScale doesn't set, it will be d3.scaleBand()/d3.scaleLinear,
      // you can pass customized sales to override the default behavior.
      xScale={xScale}
      yScale={yScale}
      data={newData}
      height={400}
      {...props}
    >
      <YAxis dataKey="temperature" format={tick => `${tick} °C`} />
      <XAxis
        dataKey="date"
        format={dateString}
      />
      <LineSeries
        dataKey="temperature"
        options={{ stroke: colors[0] }}
      />
      <Tooltip>
        {activeItem => `${dateString(activeItem.date)}: ${activeItem.temperature} °C`}
      </Tooltip>
    </ChartProvider>
  )
}
