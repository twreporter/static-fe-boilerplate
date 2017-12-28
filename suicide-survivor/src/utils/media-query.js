import { css } from 'styled-components'

export const breakPoints = {
  overDesktopMinWidth: '1440px',
  desktopMaxWidth: '1439px',
  desktopMinWidth: '1024px',
  tabletMaxWidth: '1023px',
  tabletMinWidth: '768px',
  mobileMaxWidth: '767px',
}

const mq = {
  mobile: (...args) => css`
    @media (max-width: ${breakPoints.mobileMaxWidth}) {
      ${css(...args)}
    }
  `,
  tabletAbove: (...args) => css`
    @media (min-width: ${breakPoints.tabletMinWidth}) {
      ${css(...args)}
    }
  `,
  tablet: (...args) => css`
    @media (min-width: ${breakPoints.tabletMinWidth}) and (max-width: ${breakPoints.tabletMaxWidth}) {
      ${css(...args)}
    }
  `,
  tabletBelow: (...args) => css`
    @media (max-width: ${breakPoints.tabletMaxWidth}) {
      ${css(...args)}
    }
  `,
  desktopAbove: (...args) => css`
    @media (min-width: ${breakPoints.desktopMinWidth}) {
      ${css(...args)}
    }
  `,
  desktop: (...args) => css`
    @media (min-width: ${breakPoints.desktopMinWidth}) and (max-width: ${breakPoints.desktopMaxWidth}) {
      ${css(...args)}
    }
  `,
  desktopBelow: (...args) => css`
    @media (max-width: ${breakPoints.desktopMaxWidth}) {
      ${css(...args)}
    }
  `,
  desktopHd: (...args) => css`
    @media (min-width: ${breakPoints.overDesktopMinWidth}) {
      ${css(...args)}
    }
  `,
}

export default mq
