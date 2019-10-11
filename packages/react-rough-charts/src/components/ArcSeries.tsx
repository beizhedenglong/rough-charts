/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import * as d3Shape from 'd3-shape'
import { RoughOptions, PathProps } from 'react-roughjs'
import { useChartContext } from '../hooks/useChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import { isNil, cloneElement, isFunction } from '../utils'
import { Arc, ArcProps } from './Arc'


export interface ArcSeriesProps<T> extends BaseChartComponentProps {
  dataKey: string
  data?: T[],
  innerRadiusPercent?:number
  outerRadiusPercent?:number
  cx?: number
  cy?: number
  padAngle?: number
  startAngle?: number
  endAngle?: number
  children?: React.ReactNode
  generateItemOptions?: (item: T, index: number) => RoughOptions
  renderItem?: (item: T, index: number) => React.ReactElement<PathProps>
}

export const ArcSeries = <T extends object>(props: ArcSeriesProps<T>) => { // eslint-disable-line
  const {
    data, options, contentHeight, contentWidth,
  } = useChartContext(props)
  const {
    dataKey, cx, cy, innerRadiusPercent, outerRadiusPercent,
    padAngle: padAngleProp,
    startAngle: startAngleProp,
    endAngle: endAngleProp,
  } = props
  const newCx = !isNil(cx) ? cx : contentWidth / 2
  const newCy = !isNil(cy) ? cy : contentHeight / 2
  const radius = Math.min(newCx, newCy)

  const arcs = d3Shape.pie()
    .startAngle(startAngleProp)
    .padAngle(padAngleProp)
    .endAngle(endAngleProp)(data.map(d => d[dataKey]))
  const paths = arcs.map((arc) => {
    const { startAngle, endAngle, padAngle } = arc
    const a = d3Shape.arc()
    return a({
      innerRadius: radius * innerRadiusPercent,
      outerRadius: radius * outerRadiusPercent,
      startAngle,
      endAngle,
      padAngle,
    })
  })

  const renderPath = (d:string, index:number) => {
    const { renderItem } = props
    const additionalProps = {
      d,
      key: index,
      transform: `translate(${newCx}, ${newCy})`,
      options: {
        fill: 'black',
        ...options,
      },
    } as ArcProps

    if (isFunction(renderItem)) {
      const item = renderItem(data[index], index)
      return cloneElement(
        displayName => (displayName === Arc.displayName ? additionalProps : {}), item,
      )
    }

    return <Arc {...additionalProps} />
  }

  return (
    <React.Fragment>
      {paths.map(renderPath)}
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
