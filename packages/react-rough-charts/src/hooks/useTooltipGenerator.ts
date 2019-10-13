import { useChartContext } from './useChartContext'

// https://stackoverflow.com/questions/6307307/click-mouse-position-with-scroll-in-javascript

const mousePositions = (event) => {
  const IE = !!document.all
  let x
  let y

  if (IE) {
    x = event.clientX + document.body.scrollLeft
    y = event.clientY + document.body.scrollTop
  } else {
    x = (window.Event)
      ? event.pageX
      : event.clientX + (
        document.documentElement.scrollLeft
          ? document.documentElement.scrollLeft
          : document.body.scrollLeft
      )
    y = (window.Event)
      ? event.pageY
      : event.clientY + (
        document.documentElement.scrollTop
          ? document.documentElement.scrollTop
          : document.body.scrollTop
      )
  }
  return { x, y }
}
export const useTooltipGenerator = (props: {
  dataKey: string
  [key: string]: any
}) => {
  const { dataKey } = props
  if (!dataKey) {
    throw Error('dataKey is Required!')
  }
  const { setTooltipData } = useChartContext(props as any)
  const generateHandlers = (
    item,
    content: { name: string, value: string } = { name: '', value: '' },
  ) => ({
    onMouseOver: (e) => {
      const { x, y } = mousePositions(e)
      setTooltipData(prev => ({
        ...prev,
        showToolTip: true,
        x,
        y,
        name: content.name,
        value: content.value,
      }))
    },
    onMouseMove: (e) => {
      const { x, y } = mousePositions(e)
      setTooltipData(prev => ({
        ...prev,
        showToolTip: true,
        x,
        y,
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
