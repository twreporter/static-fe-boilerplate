import { colors, fontWeight, zIndex } from '../constants/style-variables'
import ArrowDownIcon from '../../svg/arrow-down.svg'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import smoothScroll from 'smoothscroll'
import styled, { keyframes } from 'styled-components'

const fontSize = '42px'

const titleMaxWidth = {
  mobile: '340px',
  tablet: '590px',
  desktop: '80%',
}

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: black;
  z-index: ${zIndex.header};
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
  background-size: cover;
  animation: ${fadeIn} 900ms ease 1200ms both;
  background-position: center bottom;
  ${mq.mobileOnly`
    background-image: url(${props => props.mobile});
  `}
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
  font-weight: ${fontWeight.bold};
  text-shadow: 0 2px 10px rgba(0,0,0,.5);
  line-height: 1.4;
  ${mq.mobileOnly`
    font-size: 30px;
  `}
  ${mq.desktopAbove`
    white-space: pre-line;
  `}
`

const Wrapper = styled.div`
  position: absolute;
  ${mq.mobileOnly`
    text-align: left;
    left: 50%;
    bottom: 25%;
    transform: translateX(-50%);
    width: 75%;
    max-width: ${titleMaxWidth.mobile};
    min-width: 265px;
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
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: ${titleMaxWidth.desktop};
    text-align: center;
  `}
  ${mq.hdAbove`
    bottom: 14.1%;
`}
`

const Dash = styled.div`
  margin: 25px 0;
  ${mq.tabletAbove`
    margin: 25px auto;
  `}
  width: 30px;
  height: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  background-color: #fff;
`

const Date = styled.div`
  font-size: 13px;
  ${mq.tabletAbove`
    font-size: 15px;
  `}
  color: #fff;
  font-weight: 300;
  text-shadow: 0 2px 10px rgba(0,0,0,.5);
  letter-spacing: .1px;
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
  bottom: 14%;
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
    const headerBottom = this._header.scrollHeight
    return smoothScroll(headerBottom)
  }

  render() {
    const { title, image, publishedDate } = this.props
    const { mobile, tablet, desktop } = image.resizedTargets
    return (
      <Container innerRef={(ele) => { this._header = ele }}>
        <Background mobile={mobile} tablet={tablet} desktop={desktop} />
        <Wrapper>
          <Title>{title}</Title>
          <Dash />
          <Date>{publishedDate}</Date>
        </Wrapper>
        <IconContainer onClick={this._handleClick}><ArrowDownIcon /></IconContainer>
      </Container>
    )
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  image: PropTypes.shape({
    resizedTargets: PropTypes.shape({
      mobile: PropTypes.string.isRequired,
      tablet: PropTypes.string.isRequired,
      desktop: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default Header
