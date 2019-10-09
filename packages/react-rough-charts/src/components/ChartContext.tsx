import { RoughOptions, RoughProvider } from 'react-roughjs'
import * as React from 'react'

import { isNil } from '../utils'

export type Margin = {
  top?: number,
  bottom?: number
  left?: number
  right?: number
}
export interface ChartContextProps<T=any> {
  data?: T[]
  width?: number
  height?: number
  options?: RoughOptions
  margin?: Margin
}

export const ChartContext = React.createContext<ChartContextProps>(null)

export function useChartContext<T extends any>(
  props: ChartContextProps<T>,
): ChartContextProps<T> & {
    contentHeight: number,
    contentWidth: number
  } {
  const value = React.useContext(ChartContext)
  if (value === null) {
    throw Error('General Components must be wrapped in Chart Component!')
  }
  const margin = {
    ...value.margin,
    ...(props.margin || {}),
  }
  const width = !isNil(props.width) ? props.width : value.width
  const height = !isNil(props.height) ? props.height : value.height
  return {
    width,
    height,
    contentWidth: width - margin.left - margin.right,
    contentHeight: height - margin.top - margin.bottom,
    options: {
      ...(value.options),
      ...(props.options || {}),
    },
    margin,
    data: !isNil(props.data) ? props.data : value.data,
  }
}

const { Provider } = ChartContext
const defaultMargin = {
  top: 10, right: 10, bottom: 70, left: 60,
}
export const ChartProvider: React.FC<ChartContextProps> = (props) => {
  const [innerHeight, setInnerHeight] = React.useState(0)
  const [innerWidth, setInnerWidth] = React.useState(0)
  const ref = React.useRef<SVGSVGElement>()

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
        ...props,
        height,
        width,
        margin: {
          ...defaultMargin,
          ...margin,
        },
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

export default ChartContext
