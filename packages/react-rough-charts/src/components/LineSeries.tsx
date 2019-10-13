/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import * as d3Shape from 'd3-shape'
import { Path, CircleProps } from 'react-roughjs'
import { BaseChartComponentProps } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'
import { getBandWidth } from '../utils'
import { CircleSeries } from './CircleSeries'


export interface LineSeriesProps<T extends object> extends BaseChartComponentProps {
  dataKey: keyof T
  children?: (item: T, props: CircleProps, index: number) => React.ReactNode
}


export const LineSeries = <T extends object>(props: LineSeriesProps<T>) => { // eslint-disable-line
  const { scaleData, data, options } = useChartContext(props, 'lineDataKeys')
  const { xScale, yScale, xDataKey } = scaleData
  const { dataKey } = props
  if (!xScale || !yScale || !dataKey || !xDataKey) {
    return null
  }

  const bandwidth = getBandWidth(xScale)
  const points: [number, number][] = data.map((item: any) => ([
    xScale(item[xDataKey]),
    yScale(item[dataKey]),
  ]))

  const line = d3Shape
    .line()
    .curve(d3Shape.curveCardinal.tension(0.5))
  const path = line(points)
  return (
    <React.Fragment>
      <Path
        transform={`translate(${bandwidth / 2}, 0)`}
        d={path}
        options={options}
      />
      <CircleSeries
        {...props}
      />
    </React.Fragment>
  )
}

LineSeries.displayName = 'LineSeries'

export default LineSeries
