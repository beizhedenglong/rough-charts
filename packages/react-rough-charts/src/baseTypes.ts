import { RoughOptions } from 'react-roughjs'
import { ScaleBand, ScaleLinear } from 'd3-scale'
import { ChartContextArgument } from './ChartContext'

export type Scale = ScaleBand<any> | ScaleLinear<any, any>

export interface BaseChartProps<T = any> extends ChartContextArgument<T> {

}
export interface BaseChartComponentProps {
  options?: RoughOptions
}
