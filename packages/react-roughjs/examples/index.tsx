import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  RoughProvider, Curve, Path,
} from '../src'

ReactDOM.render(
  <div>
    <RoughProvider
      width={500}
      height={500}
    >
      <Curve />
      <Path d="M37,17v15H14V17z M50,0H0v50h50z" />
    </RoughProvider>
  </div>,
  document.getElementById('app'),
)
