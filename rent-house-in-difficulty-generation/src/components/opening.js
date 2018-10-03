import { siteURL } from '../constants/metadata'
import { titleNoOrgName } from '../constants/metadata'
import animations from '../utils/animations'
import BaseComponents from './base'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import screen from '../utils/screen'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'

const containerSize = {
  hdAbove: layout.hd.width.large,
  desktopOnly: layout.desktop.width.large,
  tabletOnly: layout.tablet.width.large,
}

const mockup = {
  bg: {
    desktop: {
      width: 1024,
      height: 600
    },
    mobile: {
      width: 373,
      height: 500
    }
  }
}

const Container = BaseComponents.LargeContainer.extend`
  position: relative;
  white-space: pre-wrap;
  margin: 0 auto;
  overflow-x: hidden;
`

const Background = styled.div`
  position: relative;
  width: 100%;
  background-position: center bottom;
  background-size: cover;
  background-repeat: no-repeat;
  ${screen.hdAbove`
    height: calc(${containerSize.hdAbove}px * (${mockup.bg.desktop.height} / ${mockup.bg.desktop.width}));  
    `}
  ${screen.desktopOnly`
    height: calc(${containerSize.desktopOnly}px * (${mockup.bg.desktop.height} / ${mockup.bg.desktop.width}));
    `}
  ${screen.tabletOnly`
    height: calc(${containerSize.tabletOnly}px * (${mockup.bg.mobile.height} / ${mockup.bg.mobile.width}));
  `}
  ${screen.tabletBelow`
    height: calc(100vw * (${mockup.bg.mobile.height} / ${mockup.bg.mobile.width}));
  `}
  ${screen.desktopAbove`
    background-image: url(${imgSrc['opening_back_desktop']});
  `}
  ${screen.tabletBelow`
    background-image: url(${imgSrc['opening_back_mobile']});  
  `}
`

const StyledArrow = styled.img`
  position: absolute;
  left: 50%;
  bottom: 5px;
  transform: translateX(-50%);
  width: 20px;
  cursor: pointer;
  animation-name: ${animations.bounceUpDown};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
`

const Logo = styled.a`
  img {
    width: 219px;
    margin-top: 10px;
  }
  ${screen.tabletBelow`
    display: block;
    text-align: center;
  `}
`

const MainTitle = styled.h1`
  position: absolute;
  left: 0;
  top: 0;
  visibility: hidden;
  font-size: 50px;
  font-weight: bold;
  line-height: 0.86;
  letter-spacing: 5.4px;
  text-align: center;
  color: #d8d8d8;
  text-shadow: 0 2px 4px rgba(216, 216, 216, 0.2);
  ${screen.desktopAbove`
    margin-top: 45px;
  `}
`

const FG = styled.img``

const FrontGround = styled.div `
  position: relative;
  height: 100%;
  width: auto;
  img{
    position: absolute;
    left: 50%;
    top: 0;
    height: 100%;
    transform: translateX(-50%);
  }
`

const WalkingHuman1 = styled.img`
  opacity: 1;
  animation-name: ${animations.toTransparent};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
`

const WalkingHuman2 = styled.img`
  opacity: 0;
  animation-name: ${animations.toTransparent};
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate-reverse;
`

class Opening extends PureComponent {
  _scrollDown = () => {
    smoothScroll(document.getElementById(this.props.firstAnchorId))
  }
  render() {
    return (
      <Container>
        <Logo href={siteURL} target="_blank"><img src={imgSrc['logo']}/></Logo>
        <MainTitle>{titleNoOrgName}</MainTitle>
        <Background>
          <FrontGround>
            <picture>
              <source media="(orientation: portrait)" srcSet={imgSrc['opening_front_mobile']} />
              <source media="(max-width: 768px)" srcSet={imgSrc['opening_front_mobile']} />
                <FG src={imgSrc['opening_front_desktop']} />
            </picture>
            <picture>
              <source media="(orientation: portrait)" srcSet={imgSrc['opening_human_1_mobile']} />
              <source media="(max-width: 768px)" srcSet={imgSrc['opening_human_1_mobile']} />
                <WalkingHuman1 src={imgSrc['opening_human_1_desktop']} />
            </picture>
            <picture>
              <source media="(orientation: portrait)" srcSet={imgSrc['opening_human_2_mobile']} />
              <source media="(max-width: 768px)" srcSet={imgSrc['opening_human_2_mobile']} />
                <WalkingHuman2 src={imgSrc['opening_human_2_desktop']} />
            </picture>
          </FrontGround>
        </Background>
        <StyledArrow
          src={imgSrc['icon_scroll']}
          onClick={this._scrollDown}
        />
      </Container>
    )
  }
}

Opening.propTypes = {
  firstAnchorId: PropTypes.string.isRequired,
}

export default Opening
