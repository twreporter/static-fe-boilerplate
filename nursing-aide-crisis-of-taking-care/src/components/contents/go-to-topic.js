import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mq from '../../utils/media-query'
import { colors, fontSize, fontWeight } from '../../constants/style-variables'

const Container = styled.a`
  text-decoration: none;
  cursor: pointer;
  &::before {
    content: "${props => props.prefix}";
    ${mq.mobileBelow`
      content: "${props => props.shortPrefix}";
    `}
    text-align: justify;
    color: ${colors.pageText};
    font-size: ${fontSize.textBoxDescription.mobile};
    font-weight: ${fontWeight.bold};
    line-height: 1.62;
    margin-bottom: .3em !important;
    display: block;
    ${mq.tinyOnly`
      font-size: ${fontSize.textBoxDescription.tiny};
      line-height: 1.25;
    `}
    ${mq.desktopAbove`
      width: 700px;
      font-size: ${fontSize.textBoxDescription.desktop};
      line-height: 1.75;
    `}
  }
`
const Image = styled.div`
  width: 100%;
  background-image: url(${props => props.imageSrc});
  background-size: cover;
  background-position: center center;
  ${mq.tinyOnly`
    height: 70px;
  `}
  ${mq.mobileOnly`
    height: 100px;
  `}
  ${mq.desktopAbove`
    height: 140px;
  `}
`

const HiddenText = styled.div`
  display: none;
`

export default class GoToTopic extends PureComponent {
  static propTypes = {
    href: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    shortPrefix: PropTypes.string.isRequired,
  }
  render() {
    const { href, imageSrc, prefix, shortPrefix } = this.props
    return (
      <Container href={href} target="_blank" prefix={prefix} shortPrefix={shortPrefix}>
        <Image imageSrc={imageSrc} />
        <HiddenText>{prefix}</HiddenText>
        <HiddenText>{shortPrefix}</HiddenText>
      </Container>
    )
  }
}
