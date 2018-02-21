import styled from 'styled-components'
import layout from '../layout'
import screen from '../screen'

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


export default {
  SmallContainer,
  MediumContainer,
}
