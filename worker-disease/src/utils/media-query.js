import { css } from 'styled-components'

export const breakPoints = {
  mobile: {
    max: 767,
  },
  tablet: {
    min: 768,
    max: 1023,
  },
  desktop: {
    min: 1024,
    max: 1439,
  },
  hd: {
    min: 1440,
  },
}

const mq = {
  mobileOnly: (...args) => css`
    @media (max-width: ${breakPoints.mobile.max}px) {
      ${css(...args)}
    }
  `,
  tabletOnly: (...args) => css`
    @media (min-width: ${breakPoints.tablet.min}px) and (max-width: ${breakPoints.tablet.max}px) {
      ${css(...args)}
    }
  `,
  tabletBelow: (...args) => css`
    @media (max-width: ${breakPoints.tablet.max}px) {
      ${css(...args)}
    }
  `,
  tabletAbove: (...args) => css`
  @media (min-width: ${breakPoints.tablet.min}px) {
    ${css(...args)}
  }
`,
  desktopAbove: (...args) => css`
    @media (min-width: ${breakPoints.desktop.min}px) {
      ${css(...args)}
    }
  `,
  desktopOnly: (...args) => css`
    @media (min-width: ${breakPoints.desktop.min}px) and (max-width: ${breakPoints.desktop.max}px) {
      ${css(...args)}
    }
  `,
  hdAbove: (...args) => css`
    @media (min-width: ${breakPoints.hd.min}px) {
      ${css(...args)}
    }
  `,
}

export default mq
