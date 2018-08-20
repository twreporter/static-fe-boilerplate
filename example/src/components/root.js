import React from 'react'
import { injectGlobal } from 'styled-components'
import SvgLogo from '../../svg/logo-vertical02-red.svg'
import pngLogoPath from '../../static/logo-vertical01-goldsquare.png'

const fontWeightRenderingFix = `
  text-rendering: optimizeLegibility;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  body {
    ${fontWeightRenderingFix}
    width: 100%;
    margin: 0;
    background: #58882d;
    color: #f1f1f1;
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  }
  * {
    box-sizing: border-box;
  }
`

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <h1>TEST HOME</h1>
        <div>
          <h2>SVG LOGO</h2>
          <SvgLogo />
        </div>
        <div>
          <h2>PNG LOGO</h2>
          <img src={pngLogoPath} alt="twreporter logo" />
        </div>
      </div>
    )
  }
}
