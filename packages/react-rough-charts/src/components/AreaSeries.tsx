/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import * as d3Shape from 'd3-shape'
import { Path, CircleProps, Circle } from 'react-roughjs'
import { BaseChartComponentProps, Curve } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'
import { getBandWidth, isFunction, processTooltipHandlers } from '../utils'
import { useTooltipGenerator } from '../hooks/useTooltipGenerator'


export interface AreaSeriesProps<T extends object> extends BaseChartComponentProps {
  dataKey: keyof T
  curve?: Curve
  padding?: number
  /** For rendering customized vertex */
  children?: (item: T, props: CircleProps, index: number) => React.ReactNode
}


export const AreaSeries = <T extends object>(props: AreaSeriesProps<T>) => { // eslint-disable-line
  const {
    scaleData, data, options,
  } = useChartContext(props, 'areaDataKeys')
  const {
    xScale, yScale, xDataKey, areaDataKeys,
  } = scaleData
  const {
    dataKey, curve, children, padding, overrideData
  } = props
  const { generateHandlers } = useTooltipGenerator(props as any)

  if (!xScale || !yScale || !dataKey || !xDataKey) {
    return null
  }
  const areaKeyIndex = areaDataKeys.indexOf(dataKey)
  const calculateY = (d) => {
    if (areaKeyIndex === 0) {
      return {
        y0: yScale(yScale.domain()[0]),
        y1: yScale(d[dataKey]),
      }
    }
    const sum = (keys = []) => keys.reduce((acc, key) => acc + d[key], 0)
    return {
      y0: yScale(sum(areaDataKeys.slice(0, areaKeyIndex))) - padding,
      y1: yScale(sum(areaDataKeys.slice(0, areaKeyIndex + 1))),
    }
  }
  const bandwidth = getBandWidth(xScale)
  interface Position {
    x: number
    y0: number
    y1: number
  }

  let chartData = overrideData || data;
  const positions: Position[] = chartData.map((item: any) => {
    const { y0, y1 } = calculateY(item)
    return {
      x: xScale(item[xDataKey]),
      y0,
      y1,
    }
  })
  const area = d3Shape.area<Position>()
    .x(d => d.x)
    .y1(d => d.y1)
    .y0(d => d.y0)
    .curve(curve as any)
  const areaPath = area(positions)
  return (
    <React.Fragment>
      <Path
        transform={`translate(${bandwidth / 2}, 0)`}
        d={areaPath}
        options={{
          fill: options.stroke,
          ...options,
        }}
      />
      {positions.map(({ x, y1 }, index) => {
        const childProps: CircleProps = {
          x: x + bandwidth / 2,
          y: y1,
          diameter: 12,
          options: {
            fill: options.fill || options.stroke,
            strokeWidth: 2,
            fillStyle: 'solid',
            stroke: 'white',
          },
        }
        const item = chartData[index] as T
        const handlers = generateHandlers(chartData[index], {
          name: `${item[xDataKey]} ${dataKey}`,
          value: `${item[dataKey]}`,
        })
        if (isFunction(children)) {
          return processTooltipHandlers(children(chartData[index] as T, childProps, index), handlers)
        }
        return (
          <Circle
            key={index}
            {...childProps}
            {...handlers}
          />
        )
      })}
    </React.Fragment>
  )
}

AreaSeries.displayName = 'LineSeries'

AreaSeries.defaultProps = {
  curve: d3Shape.curveCardinal.tension(0.5),
  padding: 6,
}

export default AreaSeries
