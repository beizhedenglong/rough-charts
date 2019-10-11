import * as React from 'react'
import { Line } from 'react-roughjs'
import { BaseChartComponentProps } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'

export interface Y0Props extends BaseChartComponentProps {

}

export const Y0: React.FC<Y0Props> = (props) => {
  const { scaleData: { yScale }, contentWidth } = useChartContext(props)
  if (!yScale) {
    return null
  }
  return (
    <Line
      y1={yScale(0)}
      y2={yScale(0)}
      x1={0}
      x2={contentWidth}
      strokeDasharray="30"
      options={{
        bowing: 0.2,
        ...props.options,
      }}
    />
  )
}

Y0.displayName = 'Y0'

export default Y0
