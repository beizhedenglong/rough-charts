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
    options, contentHeight,
  } = useChartContext(props)
  const {
    tickSize, fontSize, scale,
  } = props

  const ticks = (scale as any).ticks ? (scale as any).ticks() : scale.domain()
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
