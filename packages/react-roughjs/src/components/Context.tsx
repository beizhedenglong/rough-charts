import * as React from 'react'
import roughjs from 'roughjs/dist/rough.umd'
import { RoughSVG } from 'roughjs/src/svg'
import { Config as RoughConfig } from 'roughjs/src/core'
import { RoughOptions } from '../baseTypes'

export interface Config extends RoughConfig {
  options?: RoughOptions
}

export interface ContextProps {
  rough: RoughSVG,
  root: SVGSVGElement | null
}


export const Context = React.createContext<ContextProps>(null)

export interface RoughProviderProps extends React.SVGAttributes<SVGSVGElement> {
  config?: Config
  innerRef?: (ref: SVGSVGElement) => any
}


export const RoughProvider: React.FC<RoughProviderProps> = (props: RoughProviderProps) => {
  RoughProvider.displayName = 'RoughProvider'
  const { Provider } = Context
  const { innerRef, config, ...rest } = props
  const [value, setValue] = React.useState<ContextProps>({ root: null, rough: null })
  const ref = React.createRef<SVGSVGElement>()
  React.useEffect(() => {
    setValue({
      root: ref.current,
      rough: roughjs.svg(ref.current, props.config),
    })
  }, [ref.current, config])
  React.useEffect(() => {
    if (ref.current && (typeof innerRef === 'function')) {
      innerRef(ref.current)
    }
  }, [ref.current])
  return (
    <Provider
      value={value}
    >
      <svg
        {...rest}
        ref={ref}
      />
    </Provider>
  )
}
