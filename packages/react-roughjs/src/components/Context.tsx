import * as React from 'react'
import { RoughSVG } from 'roughjs/src/svg'

export interface ContextProps {
  rough: RoughSVG,
  root: SVGSVGElement | null
}


export const Context = React.createContext<ContextProps>(null)
