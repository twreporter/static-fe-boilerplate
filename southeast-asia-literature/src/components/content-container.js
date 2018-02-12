import mq from '../utils/media-query'
import styled from 'styled-components'

const textContentWidth = {
  mobile: '84%',
  tablet: '556px',
  desktop: '673px',
  hd: '673px',
  wide: '800px',
}

const ContentContainer = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 100%;
  box-sizing: border-box;
  ${mq.mobileOnly`
    width: ${textContentWidth.mobile};
  `}
  ${mq.tabletOnly`
    width: ${textContentWidth.tablet};
  `}
  ${mq.desktopOnly`
    width: ${props => (props.wide ? textContentWidth.wide : textContentWidth.desktop)};
  `}
  ${mq.hdAbove`
    width: ${props => (props.wide ? textContentWidth.wide : textContentWidth.hd)};
  `}
`

export default ContentContainer
