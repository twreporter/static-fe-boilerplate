import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Img = styled.img`
  animation: ${fadeIn} 1000ms ease 500ms both;
`

export default class FadeInImage extends PureComponent {
  render() {
    return (
      <Img {...this.props} />
    )
  }
}
