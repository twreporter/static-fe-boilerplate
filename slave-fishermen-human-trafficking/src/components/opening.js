import OpeningAnim from './opening-anim'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Waypoint from 'react-waypoint'
import animations from '../utils/animations'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import screen from '../utils/screen'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import theme from '../utils/theme'
import { scrollUnlocker } from '../utils/scroll-manager'
import { siteURL } from '../constants/metadata'
import { updateDate, subtitle ,titleNoOrgName } from '../constants/metadata'

const containerSize = {
  hdAbove: layout.hd.width.large,
  desktopOnly: layout.desktop.width.large,
  tabletOnly: layout.tablet.width.large,
}

const animeImages = {
  desktop: imgSrc['opening_desktop'],
  tablet: imgSrc['opening_tablet'],
  mobile: imgSrc['opening_mobile']
}

const mockup = {
  bg: {
    hd: {
      width: 1440,
      height: 819
    },
    desktop: {
      width: 1024,
      height: 582 
    },
    tablet: {
      width: 768,
      height: 1024
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


const Loading = styled.div`
  position: absolute;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity 1.5s ease-out;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 8px;
  width: 160px;
`

const LoadingImg = styled.img`
  width: 100%;
`

const Background = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  ${screen.desktopAbove`
    height: 100vh;
  `}
  @media only screen and (max-width: 1024px) and (orientation: landscape){ 
    height: calc(100vw * (${mockup.bg.hd.height} / ${mockup.bg.hd.width}));
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait){ 
    height: calc(100vw * (${mockup.bg.tablet.height} / ${mockup.bg.tablet.width}));
  }
  @media only screen and (max-width: 767px) and (orientation: portrait){ 
    height: calc(100vw * (${mockup.bg.mobile.height} / ${mockup.bg.mobile.width}));
  }
`

const StyledBouncingArrow = styled.img`
  position: absolute;
  left: 50%;
  bottom: 5%;
  width: 20px;
  cursor: pointer;
  animation-name: ${animations.bounceUpDown};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
  animation-timing-function: ease-in-out;
`

const StyledArrow = styled.img`
  position: absolute;
  left: 50%;
  bottom: 5%;
  width: 20px;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%);
  animation: ${props => props.startFadeIn ? animations.fadeIn : 'none'} 5000ms ease-in 5000ms both;
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

const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  line-height: 1.5;
  color: #f2f2f2;
  background: rgba(177, 92, 118, 0.5);
  margin-top: 0;
  margin-bottom: 17px;
  ${screen.mobileBelow`
    font-size: 18px;
    margin-bottom: 14.4px;
  `}
`

const MainTitle = styled.h1`
  text-align: left;
  color: #ffffff;
  white-space: nowrap;
  text-decoration: none;
  background: rgba( 0, 0, 0, 0.5);
  font-size: 45px;
  font-weight: bold;
  line-height: 1.4;
  margin: 0;
  ${screen.mobileBelow`
    font-size: 33px;
  `}
`

const CoverText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  left: 50%;
  top: 50%;
  opacity: 0;
  transform: translateX(-50%) translateY(-50%);
  animation: ${props => props.startFadeIn ? animations.fadeIn : 'none'} 5000ms ease-in 5000ms both;
  ${screen.hdAbove`
    width: calc((${props => props.mockup.bg.hd.width} - 229 * 2) / ${props => props.mockup.bg.hd.width} * 100%);
  `}
  ${screen.desktopOnly`
    width: calc((${props => props.mockup.bg.desktop.width} - 95 * 2) / ${props => props.mockup.bg.desktop.width} * 100%);
  `}
  ${screen.tabletBelow`
    align-items: center;
    width: 100%;
  `}
  ${screen.tabletOnly`
    transform: translateX(-50%) translateY(70%);
  `}
  ${screen.mobileBelow`
    transform: translateX(-50%) translateY(20%);
  `}
`

const SeperationLine = styled.div`
  width: 30px;
  height: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,.5);
  background-color: #fff;
  display: block;
  margin-top: 20px;
  margin-bottom: 38px;
  text-align: left;
  ${screen.tabletBelow`
    text-align: center;
  `}
  ${screen.tabletOnly`
    margin: 12px auto 38px auto;
  `}
  ${screen.mobileBelow`
    margin: 20px auto 25px auto;
  `}
`

const FinalUpdate = styled.p`
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  font-size: 15px;
  font-weight: ${theme.typography.font.weight.medium};
  line-height: 3.33;
  text-align: center;
  color: #ffffff; 
  text-align: left;
  ${screen.tabletBelow`
    text-align: center;
  `}
`

const HiddenImage = styled.div`
  width: 50px;
  height: 50px;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-image: url(${props => props.srcset.desktop});
  ${screen.tabletOnly`
    background-image: url(${props => props.srcset.tablet});
  `}
  ${screen.mobileBelow`
    background-image: url(${props => props.srcset.mobile});
  `}
`

const MobileTouchMask = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  ${screen.desktopAbove`
    display: none;
  `}
`

class Opening extends PureComponent {
  constructor(props){
    super(props)
    this.state = {    
      textStartFadeIn: false,
      loadingOpeningPictureCompleted: false,
      viewportInOpening: true
    }
    this.startCoverTextFadeInAnim = this._startCoverTextFadeInAnim.bind(this)
    this._scrollDown = this._scrollDown.bind(this)
    this._loadingOpeningResourceCompleted = this._loadingOpeningResourceCompleted.bind(this)
    this._onEnter = this._onEnter.bind(this)
    this._onLeave = this._onLeave.bind(this)
  }
  _scrollDown(){
    //const { firstAnchorId } = this.props
    if (typeof window === 'undefined') return
    smoothScroll(document.getElementById('section-0'))
  }
  _startCoverTextFadeInAnim(){
    this.setState({ textStartFadeIn: true })
  }
  _loadingOpeningResourceCompleted(){
    this.setState({ loadingOpeningPictureCompleted: true })
  }
  _onEnter(){
    const { viewportInOpening } = this.state
    const { showBackToTopButton } = this.props 
    showBackToTopButton(false, false)
    if (!viewportInOpening) {
      this.setState({ viewportInOpening: true})
    }
  }
  _onLeave() {
    const { viewportInOpening } = this.state
    const { showBackToTopButton } = this.props
    showBackToTopButton(true, true)
    if (viewportInOpening) {
      this.setState({ viewportInOpening: false })
    }
  }
  render() {
    const { textStartFadeIn, loadingOpeningPictureCompleted, viewportInOpening } = this.state
    const { showBackToTopButton } = this.props
    return (
      <Waypoint
        onEnter={this._onEnter}
        onLeave={this._onLeave}
        fireOnRapidScroll
      >
        <Container>
          <Loading
            show={!loadingOpeningPictureCompleted}
          >
            <LoadingImg src={'./static/icon-loading.gif'}/>
          </Loading>
          <HiddenImage 
            srcset={animeImages}
          />
          <Background>
            <OpeningAnim 
              images={animeImages}
              startCoverTextFadeInAnim={this.startCoverTextFadeInAnim}
              hideLoadingIcon={this._loadingOpeningResourceCompleted}
              shouldRenderAnime={viewportInOpening}
            />
            <Logo href={siteURL} target="_blank"><img src={imgSrc['logo']}/></Logo>
            <MobileTouchMask />
            <CoverText
              startFadeIn={textStartFadeIn}
              mockup={mockup}
            >
              <Subtitle>{subtitle}</Subtitle>
              <MainTitle>海上人口販運風暴</MainTitle>
            </CoverText>
            <StyledArrow
              src={imgSrc['icon_scroll']}
              onClick={this._scrollDown}
              startFadeIn={textStartFadeIn}
            />
          </Background>
        </Container>
      </Waypoint>
    )
  }
}

Opening.propTypes = {
  firstAnchorId: PropTypes.string.isRequired,
  showBackToTopButton: PropTypes.func.isRequired
}

export default Opening
