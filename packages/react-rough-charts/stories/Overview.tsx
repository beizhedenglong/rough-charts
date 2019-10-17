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
import { Stacked } from './AreaSeries.stories'

interface ContainerProps {
  left?: React.ReactNode
  right?: React.ReactNode
}

const Container:React.FC<ContainerProps> = ({ left, right, children }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
    <div style={{ width: '50%', minWidth: 350 }}>{left}</div>
    <div style={{ width: '50%', minWidth: 350 }}>{right}</div>
    <div style={{ width: '100%', minWidth: 350 }}>{children}</div>
  </div>
)
const Overview = () => (
  <div>
    <Container left={<WithEventHandler />} right={<Basic />} />
    <Container left={<ComposeBasic />} right={<WithCustomizedShape />} />
    <Container left={<TwoLevel />} right={<ArcWithCustomizedShape />} />
    <Container left={<LineBasic />} right={<LineWithCustomizedShape />} />
    <Container>
      <Stacked />
    </Container>
    <Container>
      <CircleBasic
        margin={{ top: 60 }}
      />
    </Container>
  </div>
)

export default Overview
