/* eslint no-unused-expressions: 0 */
import BlackBg from './timeline/black-bg'
import BlackCardSwitcher from './black-card/switcher'
import Circles from './timeline/circles'
import Colophon from './colophon'
import Credit from './credit'
import GaManager from './ga-manage'
import IntroSwitcher from './section-intro/text-switcher'
import MapBackground from './map/background'
import MapItemSwitcher from './map/item-switcher'
import MapText from './map/text-switcher'
import MaxWidthContainer from './max-width-container'
import NextPageBtn from './opening/next-page-btn'
import Opening from './opening/opening'
import React from 'react'
import SatelliteSwitcher from './satellite/satellites-switcher'
import styled, { injectGlobal } from 'styled-components'
import TimelineItem from './timeline/item'
import TimelineText from './timeline/text-switcher'
import ViewPort, { globalCssForViewport } from './fixed-viewport'

injectGlobal`
  ${globalCssForViewport}

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important; 
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important; 
    outline: none !important;
  }

  body, svg text, svg text>tspan {
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", Roboto, "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  }

  #_hj_feedback_container {
    opacity: 0;
    transition: opacity 800ms 1000ms ease;
    &>div {
      display: none;
    }
    &.show {
      opacity: 1;
      &>div {
        display: block;
      }
    }
    @media (max-width: 374px) {
      display: none;
    }
  }
`

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
`

// const Index = styled.div`
//   z-index: 999;
//   position: absolute;
//   ::after {
//     font-size: 50px;
//     color: white;
//     content: "${props => props.currentIndex}";
//     position: fixed;
//     left: 5px;
//     top: 5px;
//   }
// `

export default class Root extends React.PureComponent {
  render() {
    return (
      <Container>
        <ViewPort backgroundColor="#000" nOfIndex={19}>
          <Opening />
          <SatelliteSwitcher />
          <TimelineItem />
          <IntroSwitcher />
          <MaxWidthContainer>
            <MapBackground />
            <BlackCardSwitcher />
            <BlackBg />
            <Circles />
            <TimelineText />
            <MapItemSwitcher />
            <MapText />
          </MaxWidthContainer>
          <Colophon />
          <Credit />
          <GaManager />
          <NextPageBtn />
        </ViewPort>
      </Container>
    )
  }
}
