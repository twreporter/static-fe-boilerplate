import styled from 'styled-components'
import layout from '../utils/layout'
import screen from '../utils/screen'

const SmallContainer = styled.div`
  max-width: ${layout.mobile.width};

  ${screen.tabletOnly`
    max-width: ${layout.tablet.width.small}px;
  `};

  ${screen.desktopOnly`
    max-width: ${layout.desktop.width.small}px;
  `};

  ${screen.hdAbove`
    max-width: ${layout.hd.width.small}px;
  `};
`

const MediumContainer = styled.div`
  max-width: ${layout.mobile.width};

  ${screen.tabletOnly`
    max-width: ${layout.tablet.width.medium}px;
  `};

  ${screen.desktopOnly`
    max-width: ${layout.desktop.width.medium}px;
  `};

  ${screen.hdAbove`
    max-width: ${layout.hd.width.medium}px;
  `};
`

const LargeContainer = styled.div `
  max-width: ${layout.mobile.width};

  ${screen.tabletOnly`
    max-width: ${layout.tablet.width.large}px;
  `};

  ${screen.desktopOnly`
    max-width: ${layout.desktop.width.large}px;
  `};

  ${screen.hdAbove`
    max-width: ${layout.hd.width.large}px;
  `};
`

const MobileLargeContainer = styled.div`
  max-width: 100%;

  ${screen.tabletOnly`
    max-width: ${layout.tablet.width.medium}px;
  `};

  ${screen.desktopOnly`
    max-width: ${layout.desktop.width.medium}px;
  `};

  ${screen.hdAbove`
    max-width: ${layout.hd.width.medium}px;
  `};
`

export default {
  SmallContainer,
  MediumContainer,
  LargeContainer,
  MobileLargeContainer
}
