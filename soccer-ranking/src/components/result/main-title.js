import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontWeight } from '../../constants/style'
import mq from '../../utils/media-query'

const styleConstants = {
  height: '55px',
  fontSize: '28px',
  fontColor: '#ffffff',
  bgColor: '#124810',
  borderColor: '#ffffff',
}

const Title = styled.div`
  width: 95%;
  min-width: 320px;
  max-width: 357px;
  height: ${styleConstants.height};
  line-height: 48px;
  font-size: ${styleConstants.fontSize};
  font-weight: ${fontWeight.bold};
  letter-spacing: 1.5px;
  text-align: center;
  color: ${styleConstants.fontColor};
  background-color: ${styleConstants.bgColor};
  border: solid 3px ${styleConstants.borderColor};
  margin: 0 auto;
  ${mq.mobileBelow`
    margin: 12px auto 16px auto;
  `}
  ${mq.desktopAbove`
    margin: 50px auto 25px auto;
  `}
`

export default class MainTitle extends PureComponent {
  static propTypes = {
    content: PropTypes.string,
  }

  static defaultProps = {
    content: '',
  }

  render() {
    const { content } = this.props
    return (
      <Title>{content}</Title>
    )
  }
}
