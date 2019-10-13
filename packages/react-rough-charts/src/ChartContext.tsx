import { RoughOptions } from 'react-roughjs'
import { ScaleBand, ScaleLinear } from 'd3-scale'
import * as React from 'react'

export type Margin = {
  top?: number,
  bottom?: number
  left?: number
  right?: number
}
export type DataKey = 'xDataKey' | 'yDataKey' | 'barDataKeys' | 'lineDataKeys' | 'circleDataKeys'
export interface ScaleData<T> {
  xDataKey?: string
  yDataKey?: string
  barDataKeys: string[]
  lineDataKeys: string[]
  circleDataKeys: string[]
  xScale?: ScaleBand<any> | ScaleLinear<any, any>
  yScale?: ScaleBand<any> | ScaleLinear<any, any>
  barScale?: ScaleBand<any>
}
export interface TooltipData {
  hasToolTip: boolean
  showToolTip: boolean
  x: number
  y: number
  name: string,
  value: string
}
export type ScaleType = 'scaleLinear' | 'scaleBand'
export interface ChartContextArgument<T = any> {
  data?: T[]
  width?: number
  height?: number
  options?: RoughOptions
  margin?: Margin
  xScale?: any
  yScale?: any
}

export interface ChartContextReturn<T = any> extends Required<ChartContextArgument<T>> {
  contentHeight: number,
  contentWidth: number,
  scaleData: ScaleData<T>
  setScaleData: (f: (scaleData: ScaleData<T>) => ScaleData<T>) => void
  tooltipData: TooltipData
  setTooltipData: (f: (data: TooltipData) => TooltipData) => void
}


export const ChartContext = React.createContext<ChartContextReturn>(null)


export default ChartContext
