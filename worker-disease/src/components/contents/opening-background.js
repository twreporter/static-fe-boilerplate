import styled from 'styled-components'
import openingBgDesktop from '../../../static/opening-desktop.png'
import openingBgMobile from '../../../static/opening-mobile.png'
import mq from '../../utils/media-query'

const Background = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  background-position: center top;
  background-repeat: no-repeat;
  background-size: contain;
  @media (min-aspect-ratio: 677/1250) {
    background-image: url(${openingBgDesktop});
  }
  @media (max-aspect-ratio: 1024/814) {
    background-size: cover;
  }
  @media (max-aspect-ratio: 677/1250) {
    background-image: url(${openingBgMobile});
    background-size: cover;
  }
  ${mq.desktopAbove`
    background-size: auto auto;
  `}
`

export default Background
