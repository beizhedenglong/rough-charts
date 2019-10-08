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

export function useChartContext<T extends any>(props: ChartContextProps<T>): ChartContextProps<T> {
  const value = React.useContext(ChartContext)
  if (value === null) {
    throw Error('General Components must be wrapped in Chart Component!')
  }
  return {
    width: !isNil(props.width) ? props.width : value.width,
    height: !isNil(props.height) ? props.height : value.height,
    options: {
      ...(value.options),
      ...(props.options || {}),
    },
    margin: {
      ...value.margin,
      ...(props.margin || {}),
    },
    data: !isNil(props.data) ? props.data : value.data,
  }
}

const { Provider } = ChartContext
const defaultMargin = {
  top: 10, right: 10, bottom: 70, left: 60,
}
export const ChartProvider: React.FC<ChartContextProps> = (props) => {
  const [height, setHeight] = React.useState(0)
  const [width, setWidth] = React.useState(0)

  let node: SVGSVGElement

  const handleResize = React.useCallback(() => {
    if (node && (isNil(props.height) || isNil(props.width))) {
      const boundingRect = node.parentElement.getBoundingClientRect()
      setHeight(boundingRect.height)
      setWidth(boundingRect.width)
    }
  }, [])
  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const dimension = {
    height: !isNil(props.height) ? props.height : height,
    width: !isNil(props.width) ? props.width : width,
  }
  const shouldRenderChildren = () => (dimension.height && dimension.width)
  const { margin } = props
  return (
    <RoughProvider
      {...dimension}
      config={{
        options: props.options,
      }}
      innerRef={(elem) => {
        node = elem
        handleResize()
      }}
    >
      <Provider
        {...props}
        value={{
          ...props,
          height: dimension.height,
          width: dimension.width,
          margin: {
            ...defaultMargin,
            ...margin,
          },
        }}
      >
        {shouldRenderChildren() && props.children}
      </Provider>
    </RoughProvider>
  )
}

ChartProvider.displayName = 'ChartProvider'
ChartProvider.defaultProps = {
  data: [],
  options: {},
  margin: defaultMargin,
}

export default ChartContext
