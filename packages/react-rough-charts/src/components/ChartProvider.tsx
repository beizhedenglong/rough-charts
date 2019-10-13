import * as React from 'react'
import { RoughProvider } from 'react-roughjs'
import {
  ChartContext, ChartContextArgument, ScaleData, TooltipData,
} from '../ChartContext'
import { isNil } from '../utils'

const { Provider } = ChartContext
const defaultMargin = {
  top: 10, right: 10, bottom: 70, left: 60,
}

export const ChartProvider: React.FC<ChartContextArgument> = (props) => {
  const [innerHeight, setInnerHeight] = React.useState(0)
  const [innerWidth, setInnerWidth] = React.useState(0)
  const ref = React.useRef<SVGSVGElement>()
  const [scaleData, setScaleData] = React.useState<ScaleData<any>>({
    barDataKeys: [],
    lineDataKeys: [],
    circleDataKeys: [],
  })
  const [tooltipData, setTooltipData] = React.useState<TooltipData>({
    hasToolTip: false,
    x: -1,
    y: -1,
    showToolTip: false,
    name: '',
    value: '',
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
  xScaleType: 'scaleBand',
  yScaleType: 'scaleLinear',
}

export default RoughProvider
