/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import * as d3Scale from 'd3-scale'
import { useChartContext } from './ChartContext'
import { withChartProvider } from './withChartProvider'
import { XAxis, XAxisProps } from './XAxis'
import { YAxis } from './YAxis'
import { BarSeries, BarSeriesProps } from './BarSeries'
import { BaseChartProps } from '../baseTypes'
import { mapChildren, filterChildren } from '../utils'


interface ChildNameMap {
  XAxis?: string
  YAxis?: string
  BarSeries?: string
}


const childNameMap: ChildNameMap = {
  XAxis: XAxis.displayName,
  BarSeries: BarSeries.displayName,
  YAxis: YAxis.displayName,
}


export interface BarChartProps<T = any> extends BaseChartProps<T> {
  children?: React.ReactNode
}

export const BarChart = withChartProvider(<ItemType extends object>(props: BarChartProps<ItemType>) => { // eslint-disable-line
  const {
    data, width, height, margin,
  } = useChartContext(props)
  const cloneChildren = () => {
    let xScaleKey:string
    let xScale: any
    let xAxisElement: React.ReactElement<XAxisProps>
    let barSeriesElements: React.ReactElement<BarSeriesProps>[]
    const generateXScale = key => d3Scale
      .scaleBand()
      .domain(data.map(d => d[key]))
      .range([margin.left, width - margin.right - margin.left])
      .padding(0.2)

    xAxisElement = filterChildren(name => name === childNameMap.XAxis, props.children)[0] // eslint-disable-line

    if (xAxisElement) {
      const { dataKey } = xAxisElement.props
      xScaleKey = dataKey
      xScale = generateXScale(dataKey)
    }
    barSeriesElements = filterChildren(
      name => name === childNameMap.BarSeries, props.children,
    )
    const groups = barSeriesElements.map(child => child.props.dataKey)
    const barScale = d3Scale
      .scaleBand()
      .domain(groups)
      .padding(0.2)
    const numbers: number[] = groups.reduce((acc, groupName) => {
      acc.push(...data.map(item => +item[groupName]))
      return acc
    }, [])
    const yScale = d3Scale.scaleLinear()
      .domain([0, Math.max(...numbers)])
      .range([height - margin.bottom - margin.top, margin.top])


    if (barSeriesElements.length > 0) {
      const firstBarSeries = barSeriesElements[0]
      xScaleKey = xScaleKey || firstBarSeries.props.dataKey
      xScale = xScale || generateXScale(firstBarSeries.props.dataKey)
      barSeriesElements = mapChildren(() => ({
        xScaleKey,
        xScale,
        yScale,
        barScale,
      }), barSeriesElements)
    }

    return mapChildren((displayName) => {
      if (displayName === childNameMap.XAxis) {
        return {
          scale: xScale,
        }
      }
      if (displayName === childNameMap.BarSeries) {
        const childProps = { ...barSeriesElements.shift().props }
        return childProps
      }
      if (displayName === childNameMap.YAxis) {
        return { scale: yScale }
      }
      return {}
    }, props.children)
  }
  return (
    <React.Fragment>
      {cloneChildren()}
    </React.Fragment>
  )
})

BarChart.displayName = 'BarChart'
export default BarChart
