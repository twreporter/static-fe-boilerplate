import screen from '../utils/screen'
import styled from 'styled-components'

export const IconContainerPrototype = styled.div`
  > svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const OnlyDisplayOnMobileBelow = styled.div`
  ${screen.tabletAbove`
    display: none;
  `}
`

export const OnlyDisplayOnTabletAbove = styled.div`
 ${screen.mobileBelow`
   display: none;
 `}
`

export const OnlyDisplayOnTabletBelow = styled.div`
  ${screen.desktopAbove`
    display: none;
  `}
`

export const OnlyDisplayOnDesktopAbove = styled.div`
 ${screen.tabletBelow`
   display: none;
 `}
`
