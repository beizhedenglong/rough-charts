import * as React from 'react'
import { Path, PathProps } from 'react-roughjs'
import * as d3Shape from 'd3-shape'

export interface ArcProps extends Omit<PathProps, 'd'> {
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  padAngle?: number
  cx?: number
  cy?: number
}

export const Arc: React.FC<ArcProps> = (props) => {
  const {
    innerRadius, outerRadius,
    startAngle, endAngle, padAngle, options,
    cx, cy, ...rest
  } = props
  const a = d3Shape.arc()
  const d = a({
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    padAngle,
  })
  return (
    <Path
      d={d}
      transform={`translate(${cx}, ${cy})`}
      options={options}
      {...rest}
    />
  )
}

Arc.displayName = 'RcArc'
Arc.defaultProps = {
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
}

export default Arc
