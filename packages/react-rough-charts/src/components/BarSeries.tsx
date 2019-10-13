/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Rectangle, RectangleProps } from 'react-roughjs'
import { useChartContext } from '../hooks/useChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import { isFunction, getBandWidth, processTooltipHandlers } from '../utils'
import { useTooltipGenerator } from '../hooks/useTooltipGenerator'

export interface BarSeriesProps<T extends object> extends BaseChartComponentProps {
  dataKey: string,
  children?: (item: T, props: RectangleProps, index: number) => JSX.Element
}

export const BarSeries  = <T extends object>(props: BarSeriesProps<T>) => { // eslint-disable-line
  const {
    dataKey, options,
  } = props
  const {
    data, contentHeight, scaleData,
  } = useChartContext(props, 'barDataKeys')
  const {
    xScale, barScale, yScale, xDataKey,
  } = scaleData
  const { generateHandlers } = useTooltipGenerator(props)
  if (!dataKey) {
    throw Error('dataKey is Required!')
  }
  // TODO xDataKey
  if (!xScale || !barScale || !yScale || !xDataKey) {
    return null
  }

  const width = getBandWidth(xScale)
  const offset = (width * 0.2) / 2
  const generateChildProps = (item:T) => {
    const x = xScale(item[xDataKey])
    barScale
      .range([x + offset, x + width - offset])
    const min = yScale.domain()[0]
    const y0 = yScale(0)
    const itemY = yScale(item[dataKey])
    const y = min >= 0 ? itemY : yScale(Math.max(item[dataKey], 0))
    const height = min >= 0 ? contentHeight - itemY : Math.abs(y0 - itemY)
    return {
      x: barScale(dataKey),
      y,
      width: barScale.bandwidth(),
      height,
      options,
    }
  }
  const { children } = props
  return (
    <React.Fragment>
      {
        data.map((item, index) => {
          const handlers = generateHandlers(item)
          const childProps = generateChildProps(item as T)
          return isFunction(children)
            ? processTooltipHandlers(children(item as T, childProps, index), handlers) : (
              <Rectangle
                key={index}
                {...childProps}
                {...handlers}
              />
            )
        })
      }
    </React.Fragment>
  )
}

BarSeries.displayName = 'BarSeries'


export default BarSeries
