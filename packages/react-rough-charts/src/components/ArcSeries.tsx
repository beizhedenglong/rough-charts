/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import * as d3Shape from 'd3-shape'
import { Path, RoughOptions } from 'react-roughjs'
import { useChartContext } from './ChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import { isNil } from '../utils'


export interface ArcSeriesProps<T> extends BaseChartComponentProps {
  dataKey: string
  data?: T[],
  innerRadiusPercent?:number
  outerRadiusPercent?:number
  cx?: number
  cy?: number
  padAngle?: number
  children?: React.ReactNode
  generateItemOptions?: (item: T, index: number) => RoughOptions
}

export const ArcSeries = <T extends object>(props: ArcSeriesProps<T>) => { // eslint-disable-line
  const {
    data, width, height, margin,
  } = useChartContext(props)
  const {
    dataKey, cx, cy, innerRadiusPercent, outerRadiusPercent, padAngle,
    generateItemOptions,
  } = props
  const newCx = !isNil(cx) ? cx : (width - margin.left - margin.right) / 2
  const newCy = !isNil(cy) ? cy : (height - margin.bottom - margin.top) / 2
  const radius = Math.min(newCx, newCy)
  const arcs = d3Shape.pie()(data.map(d => d[dataKey]))
  const paths = arcs.map((arc) => {
    const { startAngle, endAngle } = arc
    const a = d3Shape.arc()
    return a({
      innerRadius: radius * innerRadiusPercent,
      outerRadius: radius * outerRadiusPercent,
      startAngle,
      endAngle,
      padAngle,
    })
  })
  return (
    <React.Fragment>
      {paths.map((d, index) => (
        <Path
          d={d}
          key={index}
          transform={`translate(${newCx}, ${newCy})`}
          options={{
            fill: 'black',
            ...(generateItemOptions(data[index], index) || {}),
          }}
        />
      ))}
    </React.Fragment>
  )
}

ArcSeries.displayName = 'ArcSeries'
ArcSeries.defaultProps = {
  innerRadiusPercent: 0,
  outerRadiusPercent: 1,
  padAngle: 0,
  generateItemOptions: () => ({}),
}

export default ArcSeries
