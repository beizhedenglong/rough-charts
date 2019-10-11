import { RoughOptions } from 'react-roughjs'
import { ChartContextArgument } from './ChartContext'


export interface BaseChartProps<T = any> extends ChartContextArgument<T> {

}
export interface BaseChartComponentProps {
  options?: RoughOptions
}
