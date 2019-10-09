import { Options } from 'roughjs/src/core'

export type Point = [number, number]
export type fillStyleType = 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots' | 'sunburst' | 'dashed' | 'zigzag-line'

export interface RoughOptions extends Options {
  fillStyle?: fillStyleType
}
export interface Handlers {
  onClick?: (e: React.MouseEvent<SVGGElement>) => any
  onMouseOver?: (e: React.MouseEvent<SVGGElement>) => any
  onMouseOut?: (e: React.MouseEvent<SVGGElement>) => any
}
export interface BaseOptions extends Handlers {
  options?: Options
  transform?: string,
  opacity?: number,
  cursor?: string
  strokeDasharray?: string
}
