import mq from '../../utils/media-query'
import openingBgDesktop from '../../../static/nursing/opening-desktop.png'
import openingBgMobile from '../../../static/nursing/opening-mobile.png'
import styled from 'styled-components'

const Background = styled.div`
  opacity: 0;
  width: calc(100% - 50px);
  margin: 0 auto;
  height: 100%;
  background-repeat: no-repeat;
  ${mq.tabletBelow`
    background-image: url(${openingBgMobile});
  `}
  ${mq.desktopAbove`
    background-image: url(${openingBgDesktop});
  `}
  @media all and (orientation: portrait) {
    background-position: center center;
    background-size: contain;
  }
  @media all and (orientation: landscape) {
    background-position: top center;
    background-size: auto auto;
  }
`

export default Background
