import { buildFontFaceString } from '../helpers/font-face'
import { getPublicUrl } from '../../scripts/handle-path'
import React from 'react'

const { DEPLOY_TYPE, NODE_ENV } = process.env
const isProduction = NODE_ENV === 'production'
const publicUrl = !isProduction ? '' : getPublicUrl('origin', DEPLOY_TYPE)
// const publicUrl = 'https://storage.googleapis.com/twreporter-infographics/staging-southeast-asia-literature-gcs'

// const notoSansLight = `${publicUrl}/static/fonts/NotoSans-Light.ttf`
// const notoSansMyanmarLight = `${publicUrl}/static/fonts/NotoSansMyanmar-Light.ttf`
// const notoSansThaiLight = `${publicUrl}/static/fonts/NotoSansThai-Light.ttf`

// const notoSansRegular = `${publicUrl}/static/fonts/NotoSans-Regular.ttf`
const notoSansMyanmarRegular = `${publicUrl}/static/fonts/NotoSansMyanmar-Regular.ttf`
const notoSansThaiRegular = `${publicUrl}/static/fonts/NotoSansThai-Regular.ttf`

// const vietnameseUnicodeRange = 'U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB'
// const latinUnicodeRange = 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'

const fontCss = `
  ${buildFontFaceString({
    family: 'Noto Sans Thai',
    style: 'normal',
    weight: '400',
    src: [{
      url: notoSansThaiRegular,
      format: 'truetype',
    }],
  })}
  ${buildFontFaceString({
    family: 'Noto Sans Myanmar',
    style: 'normal',
    weight: '400',
    src: [{
      url: notoSansMyanmarRegular,
      format: 'truetype',
    }],
  })}
`

class CssFont extends React.Component {
  shouldComponentUpdate() {
    return false
  }
  render() {
    return <style dangerouslySetInnerHTML={{ __html: fontCss }} />
  }
}

export default CssFont
