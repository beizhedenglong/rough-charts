import { ChartContextProps } from './components/ChartContext'


export interface BaseChartProps<T> extends ChartContextProps<T> {

}
export interface BaseChartComponentProps extends Omit<ChartContextProps<any>, 'data'> {

}
