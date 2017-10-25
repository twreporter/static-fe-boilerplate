import { css } from 'styled-components'
import reduce from 'lodash/reduce'

const _ = {
  reduce,
}

const breakpoints = {
  medium: {
    min: 768,
  },
  large: {
    min: 1024,
  },
  xlarge: {
    min: 1440,
  },
}

const bp = {
  small: {
    max: `${breakpoints.medium.min - 1}px`,
  },
  medium: {
    min: `${breakpoints.medium.min}px`,
    max: `${breakpoints.large.min - 1}px`,
  },
  large: {
    min: `${breakpoints.large.min}px`,
    max: `${breakpoints.xlarge.min - 1}px`,
  },
  xlarge: {
    min: `${breakpoints.xlarge.min}px`,
  },
}


export const mq = (mqSettingsObj) => {
  const mqString = _.reduce(mqSettingsObj, (result, value, key) => {
    switch (key) {
      case 'mediaType':
        return `${value} ${result}`
      default:
        return `${result} and (${key}: ${value})`
    }
  })
  return (...cssCode) => css`
    @media ${mqString} {
      ${css(...cssCode)}
    }
  `
}

export const screen = {
  mobileOnly: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bp.small.max,
  })(...cssCode),
  tabletAbove: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.medium.min,
  })(...cssCode),
  tabletOnly: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.medium.min,
    'max-width': bp.medium.max,
  })(...cssCode),
  tabletBelow: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bp.small.max,
  })(...cssCode),
  desktopBelow: (...cssCode) => mq({
    mediaType: 'only screen',
    'max-width': bp.medium.max,
  })(...cssCode),
  desktopOnly: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.large.min,
    'max-width': bp.large.max,
  })(...cssCode),
  desktopAbove: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.large.min,
  })(...cssCode),
  hdAbove: (...cssCode) => mq({
    mediaType: 'only screen',
    'min-width': bp.xlarge.min,
  })(...cssCode),
}
