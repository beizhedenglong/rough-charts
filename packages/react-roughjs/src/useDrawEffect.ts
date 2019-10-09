/* eslint-disable no-case-declarations */
import * as React from 'react'
import { RoughSVG } from 'roughjs/src/svg'
import * as d3Shape from 'd3-shape'
import { useShallowEqual } from './useShallowEqual'
import { Context } from './components/Context'
import { BaseOptions } from './baseTypes'
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
  drawFnName: T, deps: Parameters<RoughSVG[T]>, props: BaseOptions = {},
) {
  const value = React.useContext(Context)
  const nodeRef = React.useRef<SVGGElement>(null)
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
      case 'path':
        return createSvgNode('path', {
          d: deps[0],
        })
      default:
        return null
    }
  }
  const {
    transform, opacity, onClick, onMouseOut, onMouseOver,
    cursor, strokeDasharray,
  } = props
  const handlers = { onClick, onMouseOut, onMouseOver }
  const setAttribute = (node: SVGElement, attrs: object) => {
    Object.keys(attrs).forEach((attrName) => {
      if (attrName === 'strokeDasharray') {
        node.setAttribute('stroke-dasharray', attrs[attrName])
        return
      }
      if (attrs[attrName] !== undefined) {
        node.setAttribute(attrName, attrs[attrName])
      }
    })
  }

  // Style Effect
  React.useEffect(() => {
    if (nodeRef.current) {
      setAttribute(nodeRef.current, {
        transform,
        opacity,
        cursor,
        strokeDasharray,
      })
    }
  }, [transform, opacity, cursor])
  useShallowEqual(() => {
    if (value.root) {
      const node = (value.rough[drawFnName as any](...deps as any) as SVGGElement)
      nodeRef.current = node
      const fakeNode = creteFakeNode()
      setAttribute(node, {
        transform,
        opacity,
        cursor,
        strokeDasharray,
      })
      value.root.appendChild(node)
      if (fakeNode) {
        loopHandlers(fakeNode, 'addEventListener', handlers)
        setAttribute(fakeNode, {
          transform,
          cursor,
        })
        value.root.appendChild(fakeNode)
      } else {
        loopHandlers(node, 'addEventListener', handlers)
      }
      return () => {
        nodeRef.current = null
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
