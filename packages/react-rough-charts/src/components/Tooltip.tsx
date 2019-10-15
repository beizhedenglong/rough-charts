import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { RoughProvider, Rectangle } from 'react-roughjs'
import { BaseChartComponentProps } from '../baseTypes'
import { useChartContext } from '../hooks/useChartContext'
import { isNil, isFunction } from '../utils'

export interface TooltipProps<T=any> extends Omit<BaseChartComponentProps, 'data'>{
  width?:number,
  height?: number
  fontSize?: number,
  /** Use for rendering customized content */
  children?: (activeItem: T) => React.ReactNode
}


export const Tooltip: React.FC<TooltipProps> = (props) => {
  const {
    tooltipData, setTooltipData, contentWidth, options,
  } = useChartContext(props)
  const {
    x, y, showToolTip, name, value, activeItem,
  } = tooltipData
  const {
    width: propsWidth, height, fontSize, children,
  } = props
  const [internalWidth, setWidth] = React.useState(120)
  const textRef = React.useRef<SVGTextElement>()
  const width = isNil(propsWidth) ? internalWidth : propsWidth
  React.useEffect(() => {
    const node = textRef.current
    if (node) {
      const { width: textWidth } = node.getBBox()
      setWidth(textWidth + 30)
    }
  }, [textRef.current])
  if (!showToolTip || !activeItem) {
    return null
  }
  // TODO pintX pointY
  const left = contentWidth - x < width + 20 ? x - 20 - width : x + 20
  const ellipse = (s = '', length) => (s.length > length ? `${s.slice(0, length)}...` : s)
  const renderChildren = () => {
    const text = (s: string) => (
      <text
        ref={textRef}
        textAnchor="middle"
        stroke="black"
        fill="black"
        x={width / 2}
        y={height / 2 + fontSize / 3}
      >
        {s}
      </text>
    )

    if (isFunction(children)) {
      const content = children(activeItem)
      return typeof content === 'string' ? text(content) : content
    }
    return text(`${ellipse(name, 20)}: ${ellipse(value, 5)}`)
  }
  const content = (
    <div
      style={{
        position: 'absolute',
        left,
        top: y - height / 2,
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
          <RoughProvider>
            {renderChildren()}
          </RoughProvider>
        </g>
      </svg>
    </div>
  )

  return ReactDOM.createPortal(content, document.body)
}

Tooltip.displayName = 'Tooltip'
Tooltip.defaultProps = {
  height: 40,
  fontSize: 16,
}

export default Tooltip
