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
    setScaleData, scaleData,
  } = value
  const {
    userXScale, userYScale, internalXScale, internalYScale,
  } = scaleData
  const { dataKey } = props as any
  React.useEffect(() => {
    if (!scaleKeyName) {
      return
    }

    if (scaleKeyName === 'xDataKey') {
      if (userXScale) {
        userXScale.range([0, contentWidth])
        setScaleData(prev => ({
          ...prev,
          xScale: userXScale,
          xDataKey: dataKey,
        }))
        return
      }
      const values = data.map(d => d[dataKey])
      internalXScale.range([0, contentWidth])

      const domain = getDomain('scaleBand', values)
      internalXScale.domain(domain)

      setScaleData(prev => ({
        ...prev,
        [scaleKeyName]: dataKey,
        xScale: internalXScale,
      }))
    }
    if ((scaleKeyName === 'yDataKey') && dataKey) {
      if (userYScale) {
        userYScale.range([0, contentHeight])
        setScaleData(prev => ({
          ...prev,
          yScale: userYScale,
          yDataKey: dataKey,
        }))
      } else {
        const values = data.map(d => d[dataKey])
        internalYScale.range([0, contentHeight])
        const domain = getDomain('scaleLinear', values)
        internalYScale.domain(domain)
        setScaleData(prev => ({
          ...prev,
          [scaleKeyName]: dataKey,
          yScale: internalYScale,
        }))
      }
    }
    const getSeriesScaleData = (prev: ScaleData<T>) => {
      const {
        barDataKeys, lineDataKeys, yDataKey, circleDataKeys,
      } = prev
      const prevDataKeys = prev[scaleKeyName]
      const newDataKeys = prevDataKeys.indexOf(dataKey) > -1
        ? prevDataKeys
        : [...prevDataKeys, dataKey]
      const newScaleData = {
        ...prev,
        [scaleKeyName]: newDataKeys,
      }
      const values = yDataKey
        ? data.map(d => d[yDataKey])
        : removeDuplicates([...newDataKeys, ...lineDataKeys, ...barDataKeys, ...circleDataKeys])
          .reduce((acc, groupName) => {
            acc.push(...data.map(item => +item[groupName]))
            return acc
          }, [])

      // TODO xScale
      if (userYScale) {
        userYScale.range([contentHeight, 0])
        newScaleData.yScale = userYScale
      } else {
        const domain = getDomain('scaleLinear', values)
        internalYScale.domain(domain)
        internalYScale.range([contentHeight, 0])
        newScaleData.yScale = internalYScale
      }
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
