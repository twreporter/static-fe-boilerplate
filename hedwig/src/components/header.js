import { colors, fontWeight } from '../constants/style-variables'
import ArrowDownIcon from '../../static/arrow-down.svg'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { keyframes } from 'styled-components'
import smoothScroll from 'smoothscroll'

const fontSize = '42px'

const titleMaxWidth = {
  tablet: '590px',
  desktop: '80%',
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
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
  ${mq.tabletOnly`
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
  ${mq.mobileOnly`
    font-size: 25px;
    text-align: left;
    left: 50%;
    bottom: 14%;
    transform: translateX(-50%);
    width: 265px;
  `}
  ${mq.tabletOnly`
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
    white-space: pre-line;
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
  cursor: pointer;
  >svg {
    width: 100%;
    height: 100%;
  }
  bottom: 4%;
  ${mq.tabletOnly`
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
  constructor(props) {
    super(props)
    this._handleClick = this._handleClick.bind(this)
  }

  _handleClick(event) {
    event.preventDefault()
    if (typeof window === 'undefined') return
    return smoothScroll(window.innerHeight)
  }

  render() {
    const { title, image } = this.props
    const { mobile, tablet, desktop } = image.resizedTargets
    return (
      <Container>
        <Background mobile={mobile} tablet={tablet} desktop={desktop} />
        <Title>{title}</Title>
        <IconContainer onClick={this._handleClick}><ArrowDownIcon /></IconContainer>
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
