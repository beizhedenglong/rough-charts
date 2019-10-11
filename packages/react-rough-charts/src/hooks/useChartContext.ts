import * as React from 'react'
import * as d3Scale from 'd3-scale'
import {
  ChartContext, ChartContextArgument, ChartContextReturn,
  DataKey, ScaleType, ScaleData,
} from '../ChartContext'
import { isNil, removeDuplicates } from '../utils'

const getDomain = (type: ScaleType, values: number[]) => (
  type === 'scaleBand' ? values : [Math.min(...values), Math.max(...values)]
)

export function useChartContext<T extends object>(
  props: ChartContextArgument<T>,
  scaleKeyName?: DataKey,
): ChartContextReturn<T> & {
    contentHeight: number,
    contentWidth: number
  } {
  const value = React.useContext<ChartContextReturn<T>>(ChartContext)
  if (value === null) {
    throw Error('General Components must be wrapped in Chart Component!')
  }
  const {
    data, contentWidth, contentHeight,
    setScaleData, xScaleType, yScaleType,
  } = value
  const { dataKey } = props as any
  React.useEffect(() => {
    if (!scaleKeyName) {
      return
    }

    if (scaleKeyName === 'xDataKey') {
      const values = data.map(d => d[dataKey])
      const xScale = d3Scale[xScaleType]()
      xScale.range([0, contentWidth])
      const domain = getDomain(xScaleType, values)
      xScale.domain(domain)
      setScaleData(prev => ({
        ...prev,
        [scaleKeyName]: dataKey,
        xScale,
      }))
    }
    const getSeriesScaleData = (prev: ScaleData<T>) => {
      const { barDataKeys, lineDataKeys } = prev
      const prevDataKeys = prev[scaleKeyName]
      const newDataKeys = prevDataKeys.indexOf(dataKey) > 0
        ? prevDataKeys
        : [...prevDataKeys, dataKey]
      const newScaleData = {
        ...prev,
        [scaleKeyName]: newDataKeys,
      }
      const values = removeDuplicates([...newDataKeys, ...lineDataKeys, ...barDataKeys])
        .reduce((acc, groupName) => {
          acc.push(...data.map(item => +item[groupName]))
          return acc
        }, [])
      const domain = getDomain(yScaleType, values)
      // TODO xScale
      const yScale = d3Scale[yScaleType]()
      yScale.domain(domain)
      yScale.range([contentHeight, 0])
      newScaleData.yScale = yScale
      return newScaleData
    }
    if (scaleKeyName === 'barDataKeys') {
      setScaleData((prev) => {
        const newScaleData = getSeriesScaleData(prev)

        const barScale = d3Scale
          .scaleBand()
          .domain(newScaleData[scaleKeyName])
          .padding(0.05)

        newScaleData.barScale = barScale
        return newScaleData
      })
    }
    if (scaleKeyName === 'lineDataKeys') {
      setScaleData(prev => getSeriesScaleData(prev))
    }
  }, [scaleKeyName, dataKey, xScaleType, yScaleType, contentHeight, contentWidth])
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
    scaleData: value.scaleData,
    setScaleData: value.setScaleData,
    xScaleType: value.xScaleType,
    yScaleType: value.yScaleType,
  }
}
