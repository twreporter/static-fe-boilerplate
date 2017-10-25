import { colors, fontWeight } from '../constants/style-variables'
import ArrowDownIcon from '../../static/arrow-down.svg'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'

const fontSize = '42px'

const titleMaxWidth = {
  tablet: '590px',
  desktop: '50%',
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 100;
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-position: center center;
  background-size: cover;
  background-color: black;
  background-image: url(${props => props.mobile});
  animation: ${fadeIn} 900ms ease 1200ms both;
  ${mq.tabletBelow`
    background-image: url(${props => props.tablet});
  `}
  ${mq.desktopAbove`
    background-image: url(${props => props.desktop});
  `}
`

const Title = styled.h1`
  color: ${colors.white};
  font-size: ${fontSize};
  font-weight: ${fontWeight.heavy};
  position: absolute;
  white-space: pre-line;
  ${mq.tabletBelow`
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: ${titleMaxWidth.tablet};
    text-align: center;
  `}
  ${mq.desktopAbove`
    left: 87px;
    bottom: 12.8%;
    max-width: ${titleMaxWidth.desktop};
    text-align: left;
  `}
  ${mq.hdAbove`
    bottom: 20.1%;
  `}
`

const fadeInSlideDown = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`

const IconContainer = styled.div`
  position: absolute;
  left: 50%;
  height: 28px;
  >svg {
    width: 100%;
    height: 100%;
  }
  ${mq.tabletBelow`
    bottom: 5.4%
  `}
  ${mq.desktopAbove`
    bottom: 4.7%;
  `}
  ${mq.hdAbove`
    bottom: 4.2%;
  `}
  animation: ${fadeInSlideDown} 500ms ease 1000ms both;
`

class Header extends React.Component {
  render() {
    const { title, image } = this.props
    const { mobile, tablet, desktop } = image.resizedTargets
    return (
      <Container>
        <Background mobile={mobile} tablet={tablet} desktop={desktop} />
        <Title>{title}</Title>
        <IconContainer><ArrowDownIcon /></IconContainer>
      </Container>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    resizedTargets: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
      tablet: PropTypes.string.isRequired,
      desktop: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Header
