import * as React from 'react'
import roughjs from 'roughjs/dist/rough.umd'
import { RoughSVG } from 'roughjs/src/svg'
import { Options, Config } from 'roughjs/src/core'
import { useDrawEffect } from './useDrawEffect'

interface ContextProps {
  rough: RoughSVG,
  root: SVGSVGElement | null
}

export interface BaseOptions {
  options?: Options
}
export type Point = [number, number]

export const context = React.createContext<ContextProps>(null)

export interface RoughProviderProps extends React.SVGAttributes<SVGSVGElement> {
  config?: Config
}


export const RoughProvider = (props: RoughProviderProps) => {
  const { Provider } = context
  const [value, setValue] = React.useState<ContextProps>({ root: null, rough: null })
  const ref = React.createRef<SVGSVGElement>()
  React.useEffect(() => {
    setValue({
      root: ref.current,
      rough: roughjs.svg(ref.current, props.config),
    })
  }, [ref.current, props.config])
  return (
    <Provider
      value={value}
    >
      <svg
        {...props}
        ref={ref}
      />
    </Provider>
  )
}


export interface LineProps extends BaseOptions {
  x1?: number,
  x2?: number,
  y1?: number,
  y2?: number,
}

export const Line: React.FC<LineProps> = (props) => {
  const {
    x1, x2, y1, y2, options,
  } = props
  useDrawEffect('line', [x1, y1, x2, y2, options])
  return null
}
Line.defaultProps = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
}

export interface RectangleProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number
}

export const Rectangle: React.FC<RectangleProps> = (props) => {
  useDrawEffect('rectangle', [
    props.x, props.y, props.height, props.width, props.options,
  ])
  return null
}
Rectangle.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

export interface EllipseProps extends BaseOptions {
  x?: number,
  y?: number,
  width?: number,
  height?: number
}

export const Ellipse: React.FC<EllipseProps> = ({
  x, y, width, height, options,
}) => {
  useDrawEffect('ellipse', [x, y, width, height, options])
  return null
}

Ellipse.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}

export interface CircleProps extends BaseOptions {
  x?:number,
  y?: number,
  diameter?: number
}
export const Circle: React.FC<CircleProps> = (props) => {
  useDrawEffect('circle', [props.x, props.y, props.diameter, props.options])
  return null
}

Circle.defaultProps = {
  x: 0,
  y: 0,
  diameter: 0,
}

export interface LinearPathProps extends BaseOptions {
  points?: Point[]
}

export const LinearPath: React.FC<LinearPathProps> = (props) => {
  useDrawEffect('linearPath', [props.points, props.options])
  return null
}

LinearPath.defaultProps = {
  points: [],
}


export interface PolygonProps extends BaseOptions {
  vertices?: Point[]
}

export const Polygon: React.FC<PolygonProps> = (props) => {
  useDrawEffect('polygon', [props.vertices, props.options])
  return null
}

Polygon.defaultProps = {
  vertices: [],
}

export interface ArcProps extends BaseOptions {
  x?:number,
  y?: number,
  width?:number,
  height?: number,
  start?:number,
  stop?:number,
  closed?: boolean
}

export const Arc: React.FC<ArcProps> = (props) => {
  useDrawEffect('arc',
    [props.x, props.y, props.width, props.height, props.start,
      props.stop, props.closed, props.options])
  return null
}

Arc.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  start: 0,
  stop: Math.PI / 2,
  closed: false,
}


export interface CurveProps extends BaseOptions {
  points?: Point[]
}

export const Curve: React.FC<CurveProps> = (props) => {
  useDrawEffect('curve', [props.points, props.options])
  return null
}

Curve.defaultProps = {
  points: [[0, 0]], // NOTE
}

export interface PathProps extends BaseOptions {
  d?: string
}

export const Path: React.FC<PathProps> = (props) => {
  useDrawEffect('path', [props.d, props.options])
  return null
}

Path.defaultProps = {
  d: '',
}
