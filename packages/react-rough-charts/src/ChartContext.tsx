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
  internalXScale: ScaleBand<any> | ScaleLinear<any, any>
  internalYScale: ScaleBand<any> | ScaleLinear<any, any>
  xScale: ScaleBand<any> | ScaleLinear<any, any>
  yScale: ScaleBand<any> | ScaleLinear<any, any>
  userXScale?: any
  userYScale?: any
  barScale?: ScaleBand<any>
}
export interface TooltipData<T = any> {
  hasToolTip: boolean
  showToolTip: boolean
  x: number
  y: number
  name: string,
  value: string,
  activeItem: T
}
export type ScaleType = 'scaleLinear' | 'scaleBand'

export interface ChartContextArgument<T = any> {
  data?: T[]
  /** If it doesn't set, it will keep the same with parent width */
  width?: number
  /** if it doesn't set, it will keep the same with parent height */
  height?: number
  options?: RoughOptions
  margin?: Margin
  /**
   * If it doesn't set, it will be d3.scaleBand().
   * Passing a customized scale to override the default behavior. */
  xScale?: any
  /**
  * If it doesn't set, it will be d3.scaleLiner().
  * Passing a customized scale to override the default behavior. */
  yScale?: any
}

export interface ChartContextReturn<T = any> extends Required<ChartContextArgument<T>> {
  contentHeight: number,
  contentWidth: number,
  scaleData: ScaleData<T>
  setScaleData: (f: (scaleData: ScaleData<T>) => ScaleData<T>) => void
  tooltipData: TooltipData<T>
  setTooltipData: (f: (data: TooltipData<T>) => TooltipData<T>) => void
}


export const ChartContext = React.createContext<ChartContextReturn>(null)


export default ChartContext
