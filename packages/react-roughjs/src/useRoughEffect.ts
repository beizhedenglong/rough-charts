/* eslint-disable no-case-declarations */

import * as React from 'react'
import { Context, ContextProps } from './components/Context'


export function useRoughEffect(f: (value: ContextProps) => (() => void), deps: any[]) {
  const value = React.useContext(Context)
  if (!value) {
    throw Error('Wrap Component inside <RoughProvider>')
  }
  React.useEffect(() => f(value), [value, ...deps])
}
