import * as React from 'react'

export const isNil = x => x == null

export const isFunction = x => typeof x === 'function'

export const removeDuplicates = <T extends any>(xs: T[]) => { // eslint-disable-line
  const res: any = {}
  xs.forEach((key) => {
    res[key] = true
  })
  return Object.keys(res)
}

export const cloneElement = (
  f: (displayName: string, props: object) => object,
  child: any,
) => {
  if (!React.isValidElement(child as any)) {
    return null
  }
  const additionalProps = f(child.type.displayName, child.props)
  Object.entries(additionalProps).forEach(([propName, value]) => {
    if (propName === 'options') {
      additionalProps[propName] = {
        ...value,
        ...child.props.options,
      }
      return
    }
    if (!isNil(child.props[propName])) {
      additionalProps[propName] = child.props[propName]
    }
  })
  return React.cloneElement(child, additionalProps)
}
// eslint-disable-next-line
export const mapChildren = (f: (displayName: string, props: object, index: number) => object, children: any): any => React.Children.map(children, (child, index) => {
  if (!React.isValidElement(child as any)) {
    return null
  }

  return cloneElement(
    (displayName, props) => f(displayName, props, index), child,
  )
})

export const filterChildren = (
  f: (displayName: string, child: any, index: number) => any,
  children: any,
) => {
  const result = []
  React.Children.forEach(children, (child, index) => {
    if (!React.isValidElement(child as any)) {
      return
    }
    const { displayName } = child.type
    if (f(displayName, child, index)) {
      result.push(child)
    }
  })
  return result
}
