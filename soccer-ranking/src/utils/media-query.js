import { css } from 'styled-components'

export const breakPoints = {
  mini: {
    max: 374,
  },
  mobile: {
    min: 375,
    max: 767,
  },
  desktop: {
    min: 768,
  },
}

const mq = {
  miniOnly: (...args) => css`
    @media (max-width: ${breakPoints.mini.max}px) {
      ${css(...args)}
    }
  `,
  mobileOnly: (...args) => css`
    @media (min-width: ${breakPoints.mobile.min}px) and (max-width: ${breakPoints.mobile.max}px) {
      ${css(...args)}
    }
  `,
  mobileBelow: (...args) => css`
    @media (max-width: ${breakPoints.mobile.max}px) {
      ${css(...args)}
    }
  `,
  mobileAbove: (...args) => css`
    @media (min-width: ${breakPoints.mobile.min}px) {
      ${css(...args)}
    }
  `,
  desktopAbove: (...args) => css`
    @media (min-width: ${breakPoints.desktop.min}px) {
      ${css(...args)}
    }
  `,
}

export default mq
