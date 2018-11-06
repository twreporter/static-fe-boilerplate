import { rootFontSize } from '../constants/style-variables'

export const pxToRem = px => `${px / rootFontSize.mobile}rem`
