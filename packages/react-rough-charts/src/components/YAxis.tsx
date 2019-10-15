/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Line } from 'react-roughjs'
import { useChartContext } from '../hooks/useChartContext'
import { BaseChartComponentProps } from '../baseTypes'
import { isFunction } from '../utils'

export interface YAxisProps extends BaseChartComponentProps {
  dataKey?: string
  tickSize?: number
  tickCount?: number
  fontSize?: number
  format?: (tick: string) => string
}

export const YAxis: React.FC<YAxisProps> = (props) => {
  const {
    tickSize, fontSize, format, tickCount,
  } = props
  const {
    options, contentHeight, scaleData,
  } = useChartContext(props)
  const { yScale: scale } = scaleData
  if (!scale) {
    return null
  }

  const ticks = (scale as any).ticks ? (scale as any).ticks(tickCount) : scale.domain()
  return (
    <React.Fragment>
      <Line
        x1={0}
        y1={0}
        x2={0}
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
              x1={0 - tickSize}
              x2={0}
              y1={scale(t)}
              y2={scale(t)}
              options={{
                strokeWidth: 2,
                ...options,
              }}
            />
            <text
              x={0 - tickSize}
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
