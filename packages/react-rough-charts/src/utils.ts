import * as React from 'react'

export const isNil = x => x == null


// eslint-disable-next-line
export const mapChildren = (f: (displayName: string, props: object, index: number) => object, children: any) => React.Children.map(children, (child, index) => {
  if (!child) {
    return child
  }
  const { displayName } = child.type
  const newProps = f(displayName, child.props, index)

  Object.entries(newProps).forEach(([propName]) => {
    if (!isNil(child.props[propName])) {
      newProps[propName] = child.props[propName]
    }
  })
  return React.cloneElement(child, newProps)
})

export const filterChildren = (
  f: (displayName: string, child: any, index: number) => any,
  children: any,
) => {
  const result = []
  React.Children.forEach(children, (child, index) => {
    if (!child) {
      return
    }
    const { displayName } = child.type
    if (f(displayName, child, index)) {
      result.push(child)
    }
  })
  return result
}
