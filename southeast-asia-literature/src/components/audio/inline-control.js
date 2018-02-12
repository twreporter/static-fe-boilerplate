import mq from '../../utils/media-query'
import React from 'react'
import styled from 'styled-components'
import ControlPanel from './control-panel'

const padding = {
  mobile: '20px 0 5px 0',
  tablet: '30px 0 15px 0',
  desktop: '30px 0 15px 0',
}

const Container = styled.div`
  padding: ${padding.mobile};
  ${mq.tabletOnly`
    padding: ${padding.tablet};
  `}
  ${mq.desktopAbove`
    padding: ${padding.desktop};
  `}
`

class InlineControl extends React.Component {
  render() {
    return (
      <Container>
        <ControlPanel {...this.props} />
      </Container>
    )
  }
}

export default InlineControl
