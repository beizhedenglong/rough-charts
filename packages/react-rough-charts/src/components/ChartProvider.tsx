import * as React from 'react'
import { RoughProvider } from 'react-roughjs'
import * as d3Scale from 'd3-scale'
import {
  ChartContext, ChartContextArgument, ScaleData, TooltipData,
} from '../ChartContext'
import { isNil } from '../utils'

const { Provider } = ChartContext
const defaultMargin = {
  top: 10, right: 10, bottom: 50, left: 50,
}

export interface ChartProviderProps extends ChartContextArgument {
}

/**
 * The `ChartProvider` is a root component for other components.
 */
export const ChartProvider: React.FC<ChartProviderProps> = (props) => {
  const [innerHeight, setInnerHeight] = React.useState(0)
  const [innerWidth, setInnerWidth] = React.useState(0)
  const ref = React.useRef<SVGSVGElement>()
  const internalXScale = d3Scale.scaleBand()
  const internalYScale = d3Scale.scaleLinear()
  const [scaleData, setScaleData] = React.useState<ScaleData<any>>({
    barDataKeys: [],
    lineDataKeys: [],
    circleDataKeys: [],
    areaDataKeys: [],
    xScale: props.xScale || internalXScale,
    yScale: props.yScale || internalYScale,
    userXScale: props.xScale,
    userYScale: props.yScale,
    internalXScale,
    internalYScale,
  })
  const [tooltipData, setTooltipData] = React.useState<TooltipData>({
    x: -1,
    y: -1,
    showToolTip: false,
    name: '',
    value: '',
    activeItem: null,
  })


  React.useEffect(() => {
    const handleResize = () => {
      if (ref.current && (isNil(props.height) || isNil(props.width))) {
        const boundingRect = ref.current.parentElement.getBoundingClientRect()
        setInnerHeight(boundingRect.height)
        setInnerWidth(boundingRect.width)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [props.height, props.width, ref.current])


  const height = !isNil(props.height) ? props.height : innerHeight
  const width = !isNil(props.width) ? props.width : innerWidth

  const { margin: propsMargin } = props
  const margin = {
    ...defaultMargin,
    ...propsMargin,
  }
  const shouldRenderChildren = () => (height && width)
  return (
    <Provider
      value={{
        ...props as any,
        height,
        width,
        margin,
        scaleData,
        setScaleData: f => setScaleData(f),
        contentHeight: height - margin.bottom - margin.top,
        contentWidth: width - margin.left - margin.right,
        tooltipData,
        setTooltipData: f => setTooltipData(f),
      }}
    >
      <svg
        height={height}
        width={width}
        ref={ref}
      >
        <RoughProvider
          transform={`translate(${margin.left}, ${margin.top})`}
          config={{
            options: props.options,
          }}
        >
          {shouldRenderChildren() && props.children}
        </RoughProvider>
      </svg>
    </Provider>
  )
}

ChartProvider.displayName = 'ChartProvider'
ChartProvider.defaultProps = {
  data: [],
  options: {},
  margin: defaultMargin,
}

export default RoughProvider
