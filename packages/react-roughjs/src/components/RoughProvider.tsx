import * as React from 'react'
import roughjs from 'roughjs/dist/rough.umd'
import { Config as RoughConfig } from 'roughjs/src/core'
import { Context, ContextProps } from './Context'

import { RoughOptions } from '../baseTypes'

export interface Config extends RoughConfig {
  options?: RoughOptions
}
export interface RoughProviderProps extends React.SVGAttributes<SVGGElement> {
  config?: Config
}

const ref = React.createRef<SVGSVGElement>()

export const RoughProvider: React.FC<RoughProviderProps> = (props: RoughProviderProps) => {
  RoughProvider.displayName = 'RoughProvider'
  const { Provider } = Context
  const { config, ...rest } = props
  const [value, setValue] = React.useState<ContextProps>({ root: null, rough: null })
  React.useEffect(() => {
    setValue({
      root: ref.current,
      rough: roughjs.svg(ref.current, props.config),
    })
  }, [ref.current, config])
  return (
    <Provider
      value={value}
    >
      <g
        {...rest}
        ref={ref}
      />
    </Provider>
  )
}
