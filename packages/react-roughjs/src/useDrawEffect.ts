/* eslint-disable no-case-declarations */
import * as React from 'react'
import { RoughSVG } from 'roughjs/src/svg'
import * as d3Shape from 'd3-shape'
import { Context } from './components/Context'
import { Handlers } from './baseTypes'
import { loopHandlers } from './utils'

export type DrawFunction = 'line' | 'rectangle' | 'ellipse' | 'circle' | 'linearPath' | 'polygon' | 'arc' | 'curve' | 'path'

const createSvgNode = (tagName: string, attributes: any) => {
  const common = {
    opacity: '0',
    fill: 'black',
    stroke: 'black',
  }
  let attrs = {
    ...common,
    ...attributes,
  }
  const nsString = 'http://www.w3.org/2000/svg'
  let newTagName = tagName
  if (tagName === 'arc') {
    newTagName = 'path'
    const arc = d3Shape.arc()
    const {
      innerRadius, outerRadius, startAngle, endAngle, x, y, ...rest
    } = attrs
    const d = arc({
      innerRadius: innerRadius || 0,
      outerRadius: outerRadius || 0,
      startAngle: startAngle || 0,
      endAngle: endAngle || 0,
    })
    attrs = {
      ...attrs,
      ...rest,
      d,
      transform: `translate(${x}, ${y})`,
    }
  }
  const node = document.createElementNS(nsString, newTagName)
  Object.keys(attrs).forEach((attrName) => {
    node.setAttribute(attrName, attrs[attrName])
  })
  return node
}
export function useDrawEffect<T extends DrawFunction>(
  drawFnName: T, deps: Parameters<RoughSVG[T]>, handlers: Handlers = {},
) {
  const value = React.useContext(Context)
  if (!value) {
    throw Error('Wrap Component inside <RoughProvider>')
  }
  const creteFakeNode = () => {
    switch (drawFnName) {
      case 'rectangle':
        return createSvgNode('rect', {
          x: deps[0],
          y: deps[1],
          width: deps[2],
          height: deps[3],
        })
      case 'arc':
        // TODO
        return null
      default:
        return null
    }
  }
  React.useEffect(() => {
    if (value.root) {
      const node = (value.rough[drawFnName as any](...deps as any) as SVGGElement)
      const fakeNode = creteFakeNode()
      value.root.appendChild(node)
      if (fakeNode) {
        loopHandlers(fakeNode, 'addEventListener', handlers)
        value.root.appendChild(fakeNode)
      } else {
        loopHandlers(node, 'addEventListener', handlers)
      }
      return () => {
        value.root.removeChild(node)
        if (fakeNode) {
          loopHandlers(fakeNode, 'removeEventListener', handlers)
          value.root.removeChild(fakeNode)
        } else {
          loopHandlers(node, 'removeEventListener', handlers)
        }
      }
    }
    return () => { }
  }, [value, ...deps])
}
