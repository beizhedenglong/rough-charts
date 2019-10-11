import * as React from 'react'
import { RoughProvider } from 'react-roughjs'
import { ChartContext, ChartContextArgument, ScaleData } from '../ChartContext'
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

  const { margin } = props
  const shouldRenderChildren = () => (height && width)
  return (
    <Provider
      value={{
        ...props as any,
        height,
        width,
        margin: {
          ...defaultMargin,
          ...margin,
        },
        scaleData,
        setScaleData: f => setScaleData(prev => f(prev)),
        contentHeight: height - margin.bottom - margin.top,
        contentWidth: width - margin.left - margin.right,
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
