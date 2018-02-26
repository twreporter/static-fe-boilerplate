import mq from '../../utils/media-query'
import styled from 'styled-components'

const textContentWidth = {
  mobile: '89%',
  tablet: '556px',
  desktop: '673px',
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
  ${mq.desktopAbove`
    width: ${props => (props.wide ? textContentWidth.wide : textContentWidth.desktop)};
  `}
`

export default ContentContainer
