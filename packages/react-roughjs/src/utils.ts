import { Handlers } from './baseTypes'

export const loopHandlers = (
  node: SVGElement | HTMLElement,
  fName: 'addEventListener' | 'removeEventListener',
  handlers: Handlers,
) => {
  Object.keys(handlers).forEach((name) => {
    const eventName = name.replace('on', '').toLowerCase()
    node[fName](eventName, handlers[name])
  })
}
