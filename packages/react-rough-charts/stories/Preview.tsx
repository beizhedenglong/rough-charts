import * as React from 'react'
import { Preview as SBPreview } from '@storybook/components'
import code from './code.json'

export const Preview = ({ fileName, ...rest }) => (
  <SBPreview
    withSource={{
      code: code[fileName],
      language: 'jsx',
    }}
    {...rest}
  />
)

export default Preview
