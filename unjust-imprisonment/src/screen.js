import { css } from 'styled-components'

const breakPoints = {
  mobile: {
    max: '767px',
  },
  tablet: {
    min: '768px',
    max: '1023px',
  },
  desktop: {
    min: '1024px',
    max: '1439px',
  },
  hd: {
    min: '1440px',
  },
}

export const mq = (mqString) => {
  return (...cssCode) => css`
    @media ${mqString} {
      ${css(...cssCode)}
    }
  `
}

export default {
  mobileOnly: (...cssCode) => mq(`only screen and (max-width: ${breakPoints.mobile.max})`)(...cssCode),
  tabletAbove: (...cssCode) => mq(`only screen and (min-width: ${breakPoints.tablet.min})`)(...cssCode),
  tabletOnly: (...cssCode) => mq(`only screen and (min-width: ${breakPoints.tablet.min}) and (max-width: ${breakPoints.tablet.max})`)(...cssCode),
  tabletBelow: (...cssCode) => mq(`only screen and (max-width: ${breakPoints.tablet.max})`)(...cssCode),
  desktopOnly: (...cssCode) => mq(`only screen and (min-width: ${breakPoints.desktop.min}) and (max-width: ${breakPoints.desktop.max})`)(...cssCode),
  desktopAbove: (...cssCode) => mq(`only screen and (min-width: ${breakPoints.desktop.min})`)(...cssCode),
  hdAbove: (...cssCode) => mq(`only screen and (min-width: ${breakPoints.hd.min})`)(...cssCode),
}
