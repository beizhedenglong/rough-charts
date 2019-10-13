/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Circle, CircleProps } from 'react-roughjs'
import { BaseChartComponentProps } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'
import { getBandWidth, isFunction } from '../utils'


export interface CircleSeriesProps<T extends object> extends BaseChartComponentProps {
  dataKey: keyof T,
  children?: (item: T, props: CircleProps, index: number) => React.ReactNode
}


export const CircleSeries = <T extends object>(props: CircleSeriesProps<T>) => { // eslint-disable-line
  const { scaleData, data, options } = useChartContext(props, 'circleDataKeys')
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
  const { children } = props
  return (
    <React.Fragment>
      {points.map(([x, y], index) => {
        const childProps: CircleProps = {
          transform: `translate(${bandwidth / 2}, 0)`,
          x,
          y,
          diameter: 10,
          options: {
            ...options,
          },
        }
        if (isFunction(children)) {
          return children(data[index] as T, childProps, index)
        }
        return (
          <Circle
            key={index}
            {...childProps}
          />
        )
      })}
    </React.Fragment>
  )
}

CircleSeries.displayName = 'CircleSeries'

export default CircleSeries
