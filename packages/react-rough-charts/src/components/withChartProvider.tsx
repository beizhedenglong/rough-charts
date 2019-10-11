import * as React from 'react'
import { ChartProvider } from './ChartProvider'
import { BaseChartProps } from '../baseTypes'

// eslint-disable-next-line
export const withChartProvider = <ItemType, BaseProps extends BaseChartProps<ItemType>>(BaseComponent: React.ComponentType<BaseProps>) => { 
  const WithChartProvider: React.ComponentType<BaseProps> = React.memo(props => (
    <ChartProvider {...props}>
      <BaseComponent {...props} />
    </ChartProvider>
  ))
  WithChartProvider.displayName = `withChartProvider(${BaseComponent.displayName || 'Component'})`
  return WithChartProvider
}

export default withChartProvider
