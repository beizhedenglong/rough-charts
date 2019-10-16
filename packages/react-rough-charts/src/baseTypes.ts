import { RoughOptions } from 'react-roughjs'
import { ScaleBand, ScaleLinear } from 'd3-scale'
import { Line } from 'd3-shape'
import { ChartContextArgument } from './ChartContext'

export type Scale = ScaleBand<any> | ScaleLinear<any, any>

export interface BaseChartProps<T = any> extends ChartContextArgument<T> {

}
export interface BaseChartComponentProps<T = any> {
  data?: T[]
  options?: RoughOptions
}

export type Curve = Parameters<Line<any>['curve']>['0']
