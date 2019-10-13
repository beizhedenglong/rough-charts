import * as React from 'react'
import * as d3Scale from 'd3-scale'
import {
  ChartContext, ChartContextArgument, ChartContextReturn,
  DataKey, ScaleType, ScaleData,
} from '../ChartContext'
import { isNil, removeDuplicates } from '../utils'

const getDomain = (type: ScaleType, values: number[]) => {
  const min = Math.min(...values)
  return (
    type === 'scaleBand' ? values : [min, Math.max(...values)]
  )
}

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
    setScaleData,
  } = value
  const { dataKey } = props as any
  React.useEffect(() => {
    if (!scaleKeyName) {
      return
    }

    if (scaleKeyName === 'xDataKey') {
      const values = data.map(d => d[dataKey])
      const xScale = value.xScale || d3Scale.scaleBand()
      xScale.range([0, contentWidth])
      if (xScale.domain().length < 2) {
        const domain = getDomain('scaleBand', values)
        xScale.domain(domain)
      }
      setScaleData(prev => ({
        ...prev,
        [scaleKeyName]: dataKey,
        xScale,
      }))
    }
    if ((scaleKeyName === 'yDataKey') && dataKey) {
      const values = data.map(d => d[dataKey])
      const yScale = value.yScale || d3Scale.scaleLinear()
      yScale.range([0, contentHeight])
      if (yScale.domain().length < 2) {
        const domain = getDomain('scaleLinear', values)
        yScale.domain(domain)
      }
      setScaleData(prev => ({
        ...prev,
        [scaleKeyName]: dataKey,
        yScale,
      }))
    }
    const getSeriesScaleData = (prev: ScaleData<T>) => {
      const { barDataKeys, lineDataKeys, yDataKey } = prev
      const prevDataKeys = prev[scaleKeyName]
      const newDataKeys = prevDataKeys.indexOf(dataKey) > 0
        ? prevDataKeys
        : [...prevDataKeys, dataKey]
      const newScaleData = {
        ...prev,
        [scaleKeyName]: newDataKeys,
      }
      const values = yDataKey
        ? data.map(d => d[yDataKey])
        : removeDuplicates([...newDataKeys, ...lineDataKeys, ...barDataKeys])
          .reduce((acc, groupName) => {
            acc.push(...data.map(item => +item[groupName]))
            return acc
          }, [])

      // TODO xScale
      let { yScale } = prev
      if (!yScale) {
        yScale = d3Scale.scaleLinear()
        const domain = getDomain('scaleLinear', values)
        yScale.domain(domain)
      }
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

        newScaleData.barScale = barScale
        return newScaleData
      })
    }
    if ((scaleKeyName === 'lineDataKeys') || (scaleKeyName === 'circleDataKeys')) {
      setScaleData(prev => getSeriesScaleData(prev))
    }
  }, [scaleKeyName, dataKey, contentHeight, contentWidth])
  const margin = {
    ...value.margin,
  }
  const { width } = value
  const { height } = value
  return {
    ...value,
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
  }
}
