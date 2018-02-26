import map from 'lodash.map'

const _ = {
  map,
}

function buildFontFaceString({ family, style, weight, src, unicode }) {
  const isValid = element => !!element
  const fontFamily = family ? `font-family: ${family};` : ''
  const fontStyle = style ? `font-style: ${style};` : ''
  const fontWeight = weight ? `font-weight: ${weight};` : ''
  const srcForOldBrowser = src.length > 0 ? `src: url(${src[0].url});` : ''
  const srcForNewProperty = _.map(src, (s) => {
    const url = s.url ? `url(${s.url})` : ''
    const format = s.format ? `format(${s.format})` : ''
    return [url, format].filter(isValid).join(' ')
  }).filter(isValid).join(',')
  const srcForNewBrowser = (src.length > 0) ? `src: ${srcForNewProperty};` : ''
  const unicodeRange = unicode ? `unicode-range: ${unicode};` : ''
  return `@font-face {${fontFamily}${fontStyle}${fontWeight}${srcForOldBrowser}${srcForNewBrowser}${unicodeRange}}`
}

export { buildFontFaceString }
