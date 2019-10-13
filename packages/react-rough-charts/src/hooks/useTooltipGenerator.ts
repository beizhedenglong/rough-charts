import { useChartContext } from './useChartContext'

export const useTooltipGenerator = (props: {
  dataKey: string
}) => {
  const { dataKey } = props
  if (!dataKey) {
    throw Error('dataKey is Required!')
  }
  const { setTooltipData } = useChartContext(props as any)
  const generateHandlers = item => ({
    onMouseOver: e => setTooltipData(prev => ({
      ...prev,
      showToolTip: true,
      x: e.clientX,
      y: e.clientY,
      name: dataKey,
      value: item[dataKey],
    })),
    onMouseMove: (e) => {
      setTooltipData(prev => ({
        ...prev,
        showToolTip: true,
        x: e.clientX,
        y: e.clientY,
      }))
    },
    onMouseOut: () => {
      setTooltipData(prev => ({
        ...prev,
        showToolTip: false,
      }))
    },
  })
  return {
    generateHandlers,
  }
}
