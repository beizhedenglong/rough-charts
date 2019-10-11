/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Rectangle, RectangleProps } from 'react-roughjs'
import { useChartContext } from '../hooks/useChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import { isFunction } from '../utils'

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
  if (!dataKey) {
    throw Error('dataKey is Required!')
  }
  // TODO xDataKey
  if (!xScale || !barScale || !yScale || !xDataKey) {
    return null
  }

  const ticks = ('ticks' in xScale) ? xScale.ticks() : xScale.domain()
  const width = xScale(ticks[1]) - xScale(ticks[0])
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
          const childProps = generateChildProps(item as T)
          return isFunction(children) ? children(item as T, childProps, index) : (
            <Rectangle
              key={index}
              {...childProps}
            />
          )
        })
      }
    </React.Fragment>
  )
}

BarSeries.displayName = 'BarSeries'


export default BarSeries
