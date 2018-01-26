import { fontSize, fontWeight } from '../../constants/style-variables'
import screen from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import TopicIcon from '../../../svg/icon-topic.svg'

const colors = {
  white: 'white',
}

const iconWidth = {
  mobile: '13px',
  tablet: '19px',
  desktop: '19px',
  hd: '19px',
}

const infoPadding = {
  mobile: '0 20px 16px 20px',
  tablet: '0 25px 25px 25px',
  desktop: '0 30px 25px 30px',
  hd: '0 41px 35px 41px',
}

const containerHeight = {
  mobile: '100%',
  tablet: '276px',
  desktop: '357px',
  hd: '76%',
}

const Container = styled.a`
  display: block;
  position: relative;
  width: 100%;
  height: ${containerHeight.mobile};
  background-image: url(${props => props.mobileSrc});
  background-size: cover;
  background-position: center center;
  ${screen.tabletOnly`
    margin-top: 45px;
    height: ${containerHeight.tablet};
    background-image: url(${props => props.tabletSrc});
  `}
  ${screen.desktopOnly`
    margin-top: 10px;
    height: ${containerHeight.desktop};
    background-image: url(${props => props.desktopSrc});
  `}
  ${screen.hdAbove`
    height: ${containerHeight.hd};
    background-image: url(${props => props.desktopSrc});
  `}
  ${screen.desktopAbove`
    ::before {
      content: "";
      background-color: ${colors.white};
      opacity: 0;
      transition: opacity .5s ease;
      position: absolute;
      width: 100%;
      height: 100%;
      display: block;
      top: 0;
      left: 0;
    }
    :hover {
      ::before {
        opacity: .3;
      }
    }
  `}
`

const Infos = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${infoPadding.mobile};
  ${screen.tabletOnly`
    padding: ${infoPadding.tablet};
  `}
  ${screen.desktopOnly`
    padding: ${infoPadding.desktop};
  `}
  ${screen.hdAbove`
    padding: ${infoPadding.hd};
  `}
`

const Icon = styled.div`
  width: ${iconWidth.mobile};
  flex-grow: 0;
  flex-shrink: 0;
  svg {
    width: 100%;
  }
  padding-top: 5px;
  ${screen.tabletAbove`
    width: ${iconWidth.tablet};
    padding-top: 4px;
  `}
  ${screen.desktopAbove`
    width: ${iconWidth.desktop};
  `}
  ${screen.hdAbove`
    width: ${iconWidth.hd};
  `}
  `

const Title = styled.div`
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 1;
  color: ${colors.white};
  font-weight: ${fontWeight.light};
  font-size: ${fontSize.topicTitle.mobile};
  line-height: 1.44;
  letter-spacing: 1.7px;
  padding-left: 10px;
  ${screen.tabletAbove`
    font-size: ${fontSize.topicTitle.tablet};
    line-height: 1.24;
    padding-left: 15px;
  `}
  ${screen.desktopAbove`
    font-size: ${fontSize.topicTitle.desktop};
  `}
  ${screen.hdAbove`
    font-size: ${fontSize.topicTitle.hd};
  `}
`

class TopicBox extends React.PureComponent {
  render() {
    const { topicTitle, topicImage, to } = this.props
    const { mobile, tablet, desktop } = topicImage
    return (
      <Container href={to} target="_blank" mobileSrc={mobile} tabletSrc={tablet} desktopSrc={desktop} >
        <Infos>
          <Icon><TopicIcon /></Icon>
          <Title>{topicTitle}</Title>
        </Infos>
      </Container>
    )
  }
}

TopicBox.propTypes = {
  topicTitle: PropTypes.string.isRequired,
  topicImage: PropTypes.shape({
    mobile: PropTypes.string.isRequired,
    tablet: PropTypes.string.isRequired,
    desktop: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.string.isRequired,
}

export default TopicBox
