/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import * as d3Shape from 'd3-shape'
import { useChartContext } from '../hooks/useChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import {
  isNil, isFunction, processTooltipHandlers,
} from '../utils'
import { Arc, ArcProps } from './Arc'

import { useTooltipGenerator } from '../hooks/useTooltipGenerator'


export interface ArcSeriesProps<T> extends BaseChartComponentProps {
  dataKey: string
  innerRadiusPercent?:number
  outerRadiusPercent?:number
  cx?: number
  cy?: number
  padAngle?: number
  startAngle?: number
  /** Default is Math.PI * 2 */
  endAngle?: number
  children?: (item: T, props: ArcProps, index: number) => React.ReactNode
}

export const ArcSeries = <T extends object>(props: ArcSeriesProps<T>) => { // eslint-disable-line
  const {
    data, options, contentHeight, contentWidth,
  } = useChartContext(props)
  const { generateHandlers } = useTooltipGenerator(props)
  const {
    dataKey, cx, cy, innerRadiusPercent, outerRadiusPercent,
    padAngle: padAngleProp,
    startAngle: startAngleProp,
    endAngle: endAngleProp, children,
  } = props
  const newCx = !isNil(cx) ? cx : contentWidth / 2
  const newCy = !isNil(cy) ? cy : contentHeight / 2
  const radius = Math.min(newCx, newCy)

  const arcs = d3Shape.pie()
    .startAngle(startAngleProp)
    .padAngle(padAngleProp)
    .endAngle(endAngleProp)(data.map(d => d[dataKey]))
  const arcsData = arcs.map((arc) => {
    const { startAngle, endAngle, padAngle } = arc
    return {
      innerRadius: radius * innerRadiusPercent,
      outerRadius: radius * outerRadiusPercent,
      startAngle,
      endAngle,
      padAngle,
    }
  })
  const total: number = data.reduce((acc, d) => acc + d[dataKey], 0)
  return (
    <React.Fragment>
      {arcsData.map((arcProps, index) => {
        const item = data[index]
        const percent = ((item[dataKey] / total) * 100).toPrecision(3)
        const handlers = generateHandlers(item, {
          name: `${dataKey} ${item[dataKey]}`,
          value: `${percent}%`,
        })
        const childProps: ArcProps = {
          ...arcProps,
          cx: newCx,
          cy: newCy,
          options: {
            fill: 'black',
            ...options,
          },
        }
        if (isFunction(children)) {
          return processTooltipHandlers(children(item, childProps, index), handlers)
        }
        return (
          <Arc
            key={index}
            {...childProps}
            {...handlers}
          />
        )
      })}
    </React.Fragment>
  )
}

ArcSeries.displayName = 'ArcSeries'
ArcSeries.defaultProps = {
  innerRadiusPercent: 0,
  outerRadiusPercent: 1,
  padAngle: 0,
  startAngle: 0,
  endAngle: Math.PI * 2,
}

export default ArcSeries
