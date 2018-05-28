import LogoSvg from '../../static/opening/logo-horizontal01-white.svg'
// import BannerSvg from '../../static/opening/title.svg'
import bannerImage from '../../static/opening/title.png'
import LinkButton from './link-button'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import routes from './routes'
import styled, { keyframes } from 'styled-components'
import mq from '../utils/media-query'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const zoomIn = keyframes`
  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
`

const animationDelay = {
  banner: 500,
  buttons: 1500,
}

const animationDuration = {
  banner: 700,
  buttons: 900,
}

const Logo = styled.a`
  width: 130px;
  margin: 10px auto;
  display: block;
  text-decoration: none !important;
  ${mq.desktopAbove`
    margin: 20px auto 25px auto;
  `}
  >svg {
    width: 100%;
  }
`

const Banner = styled.div`
  animation: ${zoomIn} ${animationDuration.banner}ms cubic-bezier(.59,2,.53,.66) ${animationDelay.banner}ms both;
  margin: 0 auto;
  text-align: center;
  ${mq.miniOnly`
    width: 95%;
    min-width: 300px;
    margin-bottom: 10px;
  `}
  ${mq.mobileAbove`
    width: 90%;
    max-width: 380px;
    margin-bottom: 10px;
  `}
  ${mq.desktopAbove`
    width: 440px;
    margin-bottom: 26px;
  `}
  >svg, >img {
    width: 100%;
  }
`

const Container = styled.div`
  background: linear-gradient(#447a2f 50%,#58882d 50%);
  background-size: 100% 200px;
  padding: 10px 0;
  min-height: 100vh;
  ${mq.desktopAbove`
    padding: 10px; 0;
  `}
`

const text = {
  titleAlt: '世足球星誰稱王？本世紀哪些球星在世足獲得最多成就',
  desc: '足球需要靠團隊合作才能擁有好成績。梅西、C羅、內馬爾等世界級球星實力無庸置疑，但越強的明星球員是否就代表越接近世足冠軍呢？排完後告訴你！',
  playBtn: '來猜猜球星成就前5名吧！',
  resultBtn: '直接揭曉成就榜',
}

const Buttons = styled.div`
  animation: ${fadeIn} ${animationDuration.buttons}ms ease ${animationDelay.buttons}ms both;
`

export default class Home extends Component {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
  }

  render() {
    const { goTo } = this.props
    return (
      <Container>
        <Logo href="https://www.twreporter.org/" target="_blank">
          <LogoSvg />
        </Logo>
        <Banner>
          {/* <BannerSvg /> */}
          <img src={bannerImage} alt={text.titleAlt} />
        </Banner>
        <Buttons>
          <LinkButton to={routes.manual.path} goTo={goTo} bgColor="#f0932a" bgActiveColor="#d1760f">{text.playBtn}</LinkButton>
          <LinkButton to={routes.result.path} pageProps={{ withSelection: false }} goTo={goTo}>{text.resultBtn}</LinkButton>
        </Buttons>
      </Container>
    )
  }
}
