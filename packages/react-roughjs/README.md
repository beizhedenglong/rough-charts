# React Roughjs

React Wrapper for [roughjs](https://github.com/pshihn/rough).

## Installation
```
# NPM
npm install react-roughjs roughjs

# Yarn
yarn add react-roughjs roughjs
```


## Usage

```js
import * as React from 'react'
import {
  RoughProvider, Rectangle, Circle,
} from 'react-roughjs'


export const App = () => (
  <svg height={500} width={500}>
    <RoughProvider>
      <Rectangle
        x={10}
        y={10}
        width={100}
        height={100}
        options={{ fill: 'red' }}
      />
      <Circle
        x={200}
        y={60}
        diameter={100}
        options={{ fill: 'blue', fillStyle: 'cross-hatch' }}
      />
    </RoughProvider>
  </svg>
)
```