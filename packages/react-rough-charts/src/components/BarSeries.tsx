/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Rectangle } from 'react-roughjs'
import { ScaleBand } from 'd3-scale'
import { useChartContext } from './ChartContext'
import { BaseChartComponentProps } from '../baseTypes'

export interface BarSeriesProps extends BaseChartComponentProps {
  dataKey: string
  xScale?: ScaleBand<any>
  yScale?: any
  barScale?: ScaleBand<any>
  xScaleKey?: string
}

export const BarSeries: React.FC<BarSeriesProps> = (props) => {
  const {
    height, margin, data,
  } = useChartContext(props)
  const {
    xScale, dataKey, yScale, barScale, xScaleKey, options,
  } = props
  if (!dataKey) {
    throw Error('dataKey is Required!')
  }
  return (
    <React.Fragment>
      {
        data.map((item, index) => {
          const x = xScale(item[xScaleKey])
          barScale
            .range([x, x + xScale.bandwidth()])
            .paddingInner(0.2)

          const y = yScale(Math.max(item[dataKey], 0))

          return (
            <Rectangle
              key={index}
              x={barScale(dataKey)}
              y={y}
              width={barScale.bandwidth()}
              height={Math.abs(yScale(item[dataKey]) - yScale(0))}
              options={options}
            />
          )
        })
      }
    </React.Fragment>
  )
}

BarSeries.displayName = 'BarSeries'


export default BarSeries
