import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RoughProvider, Rectangle } from 'react-roughjs'
import { BaseChartComponentProps } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'

export interface TooltipProps extends BaseChartComponentProps {
  width?:number,
  height?: number
}


export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    tooltipData, setTooltipData, contentWidth, options,
  } = useChartContext(props)
  const {
    x, y, showToolTip, name, value,
  } = tooltipData
  const { width, height } = props

  const display = (!showToolTip) ? 'none' : 'inline-block'
  // TODO pintX pointY
  const left = contentWidth - x < width + 20 ? x - 20 - width : x + 20
  const content = (
    <div
      style={{
        position: 'absolute',
        left,
        top: y - height / 2,
        display,
      }}
    >
      <svg
        width={width + 4}
        height={height + 4}
      >
        <g transform="translate(2, 2)">
          <RoughProvider>
            <Rectangle
              width={width}
              height={height}
              onMouseMove={(e) => {
                setTooltipData(prev => ({
                  ...prev,
                  x: e.clientX,
                  y: e.clientY,
                }))
              }}
              onMouseOut={() => {
                setTooltipData(prev => ({
                  ...prev,
                  showToolTip: false,
                }))
              }}
              options={{
                fill: 'white',
                fillStyle: 'solid',
                ...options,
              }}
            />
          </RoughProvider>
          <text stroke="black" fill="black" x={10} y={20}>{`Name: ${name}`}</text>
          <text stroke="black" fill="black" x={10} y={40}>{`Value: ${value}`}</text>
        </g>
      </svg>
    </div>
  )

  return ReactDOM.createPortal(content, document.body)
}

Tooltip.displayName = 'Tooltip'
Tooltip.defaultProps = {
  width: 120,
  height: 50,
}

export default Tooltip
