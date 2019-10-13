import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RoughProvider, Rectangle } from 'react-roughjs'
import { BaseChartComponentProps } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'

export interface TooltipProps extends BaseChartComponentProps {
  width?:number,
  height?: number
  fontSize?: number
}


export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    tooltipData, setTooltipData, contentWidth, options,
  } = useChartContext(props)
  const {
    x, y, showToolTip, name, value,
  } = tooltipData
  const { width, height, fontSize } = props

  const display = (!showToolTip) ? 'none' : 'inline-block'
  // TODO pintX pointY
  const left = contentWidth - x < width + 20 ? x - 20 - width : x + 20
  const ellipse = (s = '') => (s.length >= 5 ? `${s.slice(0, 5)}...` : s)
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
              onMouseOver={(e) => {
                setTooltipData(prev => ({
                  ...prev,
                  x: e.clientX,
                  y: e.clientY,
                }))
              }}
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
                strokeWidth: 2,
                ...options,
              }}
            />
          </RoughProvider>
          <text
            textAnchor="middle"
            stroke="black"
            fill="black"
            x={width / 2}
            y={height / 2 + fontSize / 3}
          >
            {`( ${ellipse(name)}, ${ellipse(value)} )`}
          </text>
        </g>
      </svg>
    </div>
  )

  return ReactDOM.createPortal(content, document.body)
}

Tooltip.displayName = 'Tooltip'
Tooltip.defaultProps = {
  width: 120,
  height: 40,
  fontSize: 16,
}

export default Tooltip
