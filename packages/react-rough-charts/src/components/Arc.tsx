import * as React from 'react'
import { Path, PathProps } from 'react-roughjs'

export interface ArcProps extends PathProps {

}

export const Arc: React.FC<ArcProps> = props => <Path {...props} />

Arc.displayName = 'RcArc'

export default Arc
