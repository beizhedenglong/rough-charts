import * as React from 'react'
import shallowEqual from 'shallowequal'

const isEqual = (depsA: any[] = [], depsB: any[] = []) => {
  if (depsA.length !== depsB.length) {
    return false
  }
  return depsA.every((a, index) => shallowEqual(a, depsB[index]))
}
export const useShallowEqual = (
  f: React.EffectCallback, deps: any[],
) => {
  const ref = React.useRef([])
  if (!isEqual(ref.current, deps)) {
    ref.current = deps
  }
  React.useEffect(f, ref.current)
}

export default useShallowEqual
