import { breakPoints } from './media-query'

const getDeviceType = (defaultValue = '') => {
  if (typeof window === 'undefined') return defaultValue
  const width = window.innerWidth
  if (!width) return defaultValue
  if (width <= breakPoints.mobile.max) return 'mobile'
  if (width <= breakPoints.tablet.max) return 'tablet'
  return 'desktop'
}

export default getDeviceType
