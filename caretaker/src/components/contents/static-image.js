import styled from 'styled-components'
import mq from '../../utils/media-query'

const ImageWrapper = styled.div`
  ${mq.mobileOnly`
    height: 50%;
    width: auto;
    >svg, >img {
      width: auto;
      height: 100%;
    }
  `}
  @media (max-height: 590px) {
    height: ${props => props.smallScreenHeight || 'calc(100% - 250px)'};
    width: auto;
    &>svg, &>img {
      width: auto;
      height: 100%;
    }
  }
  ${mq.tabletOnly`
    &>svg, &>img {
      width: auto;
      height: 320px;
    }
  `}
  ${mq.desktopAbove`
    width: 420px;
    height: 420px;
    &>svg, &>img {
      max-width: 100%;
      max-height: 100%;
    }
  `}
`

export default ImageWrapper
