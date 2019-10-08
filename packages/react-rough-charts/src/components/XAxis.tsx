/* eslint-disable react/no-array-index-key */
import * as React from 'react'
import { Line } from 'react-roughjs'
import { ScaleBand } from 'd3-scale'
import { useChartContext } from './ChartContext'
import { BaseChartComponentProps } from '../baseTypes'

export interface XAxisProps extends BaseChartComponentProps {
  dataKey: string
  tickSize?: number
  fontSize?: number
  scale?: ScaleBand<any>
}

export const XAxis: React.FC<XAxisProps> = (props) => {
  const {
    width, height, margin, options,
  } = useChartContext(props)
  const {
    tickSize, fontSize, scale,
  } = props

  const x = scale
  const ticks = (x as any).ticks ? (x as any).ticks() : x.domain()
  const y = height - margin.bottom - margin.top
  return (
    <React.Fragment>
      <Line
        x1={margin.left}
        y1={y}
        x2={width - margin.right}
        y2={y}
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
              x1={x(t) + x.bandwidth() / 2}
              y1={y}
              x2={x(t) + x.bandwidth() / 2}
              y2={y + tickSize}
              options={{
                strokeWidth: 2,
                ...options,
              }}
            />
            <text
              x={x(t) + x.bandwidth() / 2}
              y={y + tickSize + fontSize}
              stroke={options.stroke}
              fill={options.stroke}
              textAnchor="middle"
            >
              {t}
            </text>
          </React.Fragment>
        ))
      }
    </React.Fragment>
  )
}

XAxis.displayName = 'XAxis'
XAxis.defaultProps = {
  tickSize: 10,
  fontSize: 16,
}

export default XAxis
