import * as React from 'react'
import {
  Basic,
  WithCustomizedShape,
  WithEventHandler,
} from './BarSeries.stories'
import {
  // Basic as ArcSeriesBasic,
  TwoLevel,
  WithCustomizedShape as ArcWithCustomizedShape,
} from './ArcSeries.stories'
import { Basic as CircleBasic } from './CircleSeries.stories'
import {
  Basic as LineBasic,
  WithCustomizedShape as LineWithCustomizedShape,
} from './LineSeries.stories'
import { Basic as ComposeBasic } from './ComposeSeries.stories'

const props = { width: 400, height: 400 }
const Overview = () => (
  <div
    style={{ display: 'flex', flexWrap: 'wrap' }}
  >
    <WithEventHandler {...props} />
    <Basic {...props} />
    <ComposeBasic {...props} />
    <WithCustomizedShape {...props} />
    <TwoLevel {...props} />
    <ArcWithCustomizedShape {...props} />
    <LineBasic {...props} />
    <LineWithCustomizedShape {...props} />
    <CircleBasic
      {...props}
      width={1000}
      margin={{ right: 200, top: 30 }}
    />
  </div>
)

export default Overview
