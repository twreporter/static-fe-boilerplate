import mq from '../utils/media-query'
import styled from 'styled-components'

const textContentWidth = {
  mobile: '84%',
  tablet: '556px',
  desktop: '673px',
  hd: '673px',
}

export const ContentContainer = styled.div`
  margin: 0 auto;
  max-width: 100%;
  ${mq.mobileOnly`
    width: ${textContentWidth.mobile};
  `}
  ${mq.tabletOnly`
    width: ${textContentWidth.tablet};
  `}
  ${mq.desktopOnly`
    width: ${textContentWidth.desktop};
  `}
  ${mq.hdAbove`
    width: ${textContentWidth.hd};
  `}
`

export const ContainerWrapper = styled.div`
  width: 100%;
  position: realtive;
`
