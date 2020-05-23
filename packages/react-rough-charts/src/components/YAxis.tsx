/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Line } from 'react-roughjs'
import { useChartContext } from '../hooks/useChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import { isFunction, getBandWidth, isNil } from '../utils'

export interface YAxisProps extends BaseChartComponentProps {
  dataKey?: string
  tickSize?: number
  tickCount?: number
  fontSize?: number
  format?: (tick: string) => string
  startFromX?: any
}

export const YAxis: React.FC<YAxisProps> = (props) => {
  const {
    tickSize, fontSize, format, tickCount, startFromX,
  } = props
  const {
    options, contentHeight, scaleData,
  } = useChartContext(props, 'yDataKey')
  const { yScale: scale, xScale } = scaleData
  if (!scale || !xScale) {
    return null
  }

  const bandwidth = getBandWidth(xScale)

  const startX = isNil(startFromX) ? 0 : xScale(startFromX) + bandwidth / 2

  const ticks = (scale as any).ticks ? (scale as any).ticks(tickCount) : scale.domain()
  return (
    <React.Fragment>
      <Line
        x1={startX}
        y1={0}
        x2={startX}
        y2={contentHeight}
        options={{
          bowing: 0.2,
          ...options,
        }}
      />
      {
        ticks.map((t, index) => (
          <React.Fragment
            key={index}
          >
            <Line
              x1={startX - tickSize}
              x2={startX}
              y1={scale(t)}
              y2={scale(t)}
              options={{
                strokeWidth: 2,
                ...options,
              }}
            />
            <text
              x={startX - tickSize}
              y={scale(t) + fontSize / 3}
              stroke={options.stroke}
              fill={options.stroke}
              textAnchor="end"
            >
              {isFunction(format) ? format(t) : String(t)}
            </text>
          </React.Fragment>
        ))
      }
    </React.Fragment>
  )
}

YAxis.displayName = 'YAxis'
YAxis.defaultProps = {
  tickSize: 10,
  fontSize: 16,
  tickCount: 10,
}

export default YAxis
