import * as React from 'react'
import { RoughSVG } from 'roughjs/src/svg'
import { context } from './index'

export type DrawFunction = 'line' | 'rectangle' | 'ellipse' | 'circle' | 'linearPath' | 'polygon' | 'arc' | 'curve' | 'path'

export function useDrawEffect<T extends DrawFunction>(
  drawFnName: T, options: Parameters<RoughSVG[T]>,
) {
  const value = React.useContext(context)
  if (!value) {
    throw Error('Wrap Component inside <RoughProvider>')
  }
  React.useEffect(() => {
    if (value.root) {
      const node = value.rough[drawFnName as any](...options as any)
      value.root.append(node)
      return () => value.root.removeChild(node)
    }
    return () => { }
  }, [value, ...options])
}
