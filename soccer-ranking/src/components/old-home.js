import { fontWeight } from '../constants/style'
import bannerImage from '../../static/opening/title.png'
import foorBallIcon from '../../static/opening/soccer-shadow.png'
import LinkButton from './link-button'
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import routes from './routes'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeInDelay = {
  banner: 0,
  desc: 0,
  buttons: 0,
}

const text = {
  titleAlt: '世足封神榜：誰是兼具實力與運氣的世界盃球星？',
  desc: '足球需要靠團隊合作才能擁有好成績。梅西、C羅、內馬爾等世界級球星實力無庸置疑，但越強的明星球員是否就代表越接近世足冠軍呢？排完後告訴你！',
  playBtn: '吹哨開始！',
  resultBtn: '直接揭曉成就榜',
}

const Container = styled.div`
  background-color: #58882d;
  padding-top: 16px;
  ${mq.desktopAbove`
    padding-top: 28px;
  `}
`

const Banner = styled.div`
  animation: ${fadeIn} 1000ms ease ${fadeInDelay.banner}ms both;
  margin: 0 auto;
  text-align: center;
  ${mq.miniOnly`
    width: 98%;
    min-width: 310px;
    height: 142px;
  `}
  ${mq.mobileOnly`
    width: 348px;
    height: 156px;
  `}
  ${mq.desktopAbove`
    width: 550px;
    height: 247px;
  `}
  >img {
    width: 100%;
  }
`

const PlayGround = styled.div`
  width: 100%;
  position: relative;
  height: 100px;
  margin: 20px auto 0 auto;
  ${mq.mobileBelow`
    margin: 20px auto 16px auto;
  `}
  ${mq.desktopAbove`
    margin: 40px auto 40px auto;
  `}
`

const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 89px;
  height: 89px;
  border: solid 3px rgb(164, 188, 141);
  border-radius: 50%;
`

const Line = styled.div`
  height: 3px;
  width: 100%;
  background-color: rgb(164, 188, 141);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const Football = styled.img`
  width: 22px;
  position: absolute;
  top: 59%;
  right: 41%;
`

const Desc = styled.div`
  ${mq.mobileBelow`
    width: 313px;
    margin: 0 auto 30px auto;
  `}
  ${mq.desktopAbove`
    width: 450px;
    margin: 0 auto 40px auto;
  `}
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  line-height: 1.56;
  text-align: justify;
  color: rgba(0, 0, 0, 0.55);
  animation: ${fadeIn} 1000ms ease ${fadeInDelay.desc}ms both;
`

const Buttons = styled.div`
  animation: ${fadeIn} 1000ms ease ${fadeInDelay.buttons}ms both;
`

export default class Home extends Component {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
  }

  render() {
    const { goTo } = this.props
    return (
      <Container>
        <Banner>
          <img src={bannerImage} alt={text.titleAlt} />
        </Banner>
        <PlayGround>
          <Circle />
          <Line />
          <Football src={foorBallIcon} />
        </PlayGround>
        <Desc>{text.desc}</Desc>
        <Buttons>
          <LinkButton to={routes.manual.path} goTo={goTo} bgColor="#f0932a" bgActiveColor="#d1760f">{text.playBtn}</LinkButton>
          <LinkButton to={routes.result.path} pageProps={{ withSelection: false }} goTo={goTo}>{text.resultBtn}</LinkButton>
        </Buttons>
      </Container>
    )
  }
}
