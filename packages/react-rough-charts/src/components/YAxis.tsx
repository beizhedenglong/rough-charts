/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Line } from 'react-roughjs'
import { ScaleBand } from 'd3-scale'
import { useChartContext } from './ChartContext'
import { BaseChartComponentProps } from '../baseTypes'

export interface YAxisProps extends BaseChartComponentProps {
  tickSize?: number
  fontSize?: number
  scale?: ScaleBand<any>
}

export const YAxis: React.FC<YAxisProps> = (props) => {
  const {
    height, options, margin,
  } = useChartContext(props)
  const {
    tickSize, fontSize, scale,
  } = props

  const ticks = (scale as any).ticks ? (scale as any).ticks() : scale.domain()
  return (
    <React.Fragment>
      <Line
        x1={margin.left}
        y1={margin.top}
        x2={margin.left}
        y2={height - margin.bottom - margin.top}
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
              x1={margin.left - tickSize}
              x2={margin.left}
              y1={scale(t)}
              y2={scale(t)}
              options={{
                strokeWidth: 2,
                ...options,
              }}
            />
            <text
              x={margin.left - tickSize}
              y={scale(t) + fontSize / 3}
              stroke={options.stroke}
              fill={options.stroke}
              textAnchor="end"
            >
              {t}
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
}

export default YAxis
