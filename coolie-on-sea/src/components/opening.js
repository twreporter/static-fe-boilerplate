import { scrollUnlocker } from '../utils/scroll-manager'
import { siteURL } from '../constants/metadata'
import { titleNoOrgName } from '../constants/metadata'
import animations from '../utils/animations'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import screen from '../utils/screen'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import theme from '../utils/theme'

const updateDate = '2018.10.25'

const containerSize = {
  hdAbove: layout.hd.width.large,
  desktopOnly: layout.desktop.width.large,
  tabletOnly: layout.tablet.width.large,
}

const mockup = {
  bg: {
    hd: {
      width: 1440,
      height: 847
    },
    desktop: {
      width: 1024,
      height: 600
    },
    mobile: {
      width: 375,
      height: 556
    }
  }
}

const Container = styled.div`
  position: relative;
  white-space: pre-wrap;
  margin: 0 auto;
  overflow-x: hidden;  
  max-width: 100%;
`

const Background = styled.div`
  position: relative;
  width: 100%;
  background-position: center top;
  background-size: cover;
  background-repeat: no-repeat;
  ${screen.desktopAbove`
    height: 100vh;
  `}
  ${screen.tabletOnly`
    height: calc(${containerSize.tabletOnly}px * (${mockup.bg.mobile.height} / ${mockup.bg.mobile.width}));
  `}
  ${screen.tabletBelow`
    height: calc(100vw * (${mockup.bg.mobile.height} / ${mockup.bg.mobile.width}));
  `}
  ${screen.desktopAbove`
    background-image: url(${imgSrc['opening_desktop']});
  `}
  ${screen.tabletBelow`
    background-image: url(${imgSrc['opening_mobile']});  
  `}
`

const StyledArrow = styled.img`
  position: absolute;
  left: 50%;
  bottom: 15px;
  width: 20px;
  cursor: pointer;
  animation-name: ${animations.bounceUpDown};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
`

const Logo = styled.a`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  img {
    width: 219px;
    margin-top: 30px;
  }
  ${screen.mobileBelow`
    img {
      margin-top: 20px;
    }
  `}
`

const MainTitle = styled.h1`
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-size: 45px;
  font-weight: ${theme.typography.font.weight.bold};
  font-style: normal;
  font-stretch: normal;
  line-height: 1.11;
  letter-spacing: normal;
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
  ${screen.mobileBelow`
    font-size: 30px;
  `}
`

const CoverText = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  ${screen.mobileBelow`
    transform: translateX(-50%);
  `}
`

const SeperationLine = styled.div`
  width: 30px;
  height: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  background-color: #fff;
  display: block;
  margin: 15px auto;
`

const FinalUpdate = styled.p`
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-size: 15px;
  font-weight: ${theme.typography.font.weight.medium};
  line-height: 3.33;
  text-align: center;
  color: #ffffff;  
`

class Opening extends PureComponent {
  _scrollDown = (event) => {
    const { playAllAudios, firstAnchorId } = this.props
    event.preventDefault()
    if (typeof window === 'undefined') return
    if (document.body.style.overflowY === 'hidden') {
      scrollUnlocker()
      playAllAudios()
    }
    smoothScroll(document.getElementById(firstAnchorId))
  }
  render() {
    return (
      <Container>
        <Background>
          <Logo href={siteURL} target="_blank"><img src={imgSrc['logo']}/></Logo>
          <CoverText>
            <MainTitle>{titleNoOrgName}</MainTitle>
            <SeperationLine />
            <FinalUpdate>{updateDate}最後更新</FinalUpdate>
          </CoverText>
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
