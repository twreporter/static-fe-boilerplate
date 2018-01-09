/* eslint no-unused-expressions: 0 */
import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Slides from './slides/slides-wrapper'
import slides from '../data/slides'
import { colors } from '../constants/style-variables'

injectGlobal`
  html, body {
    touch-action: manipulation;
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
  }
  body, svg text, svg text>tspan {
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", Roboto, "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  }

  html, body, #root {
    height: 100%;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important;
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important;
    outline: none !important;
  }

  #_hj_feedback_container {
    opacity: 0;
    transition: opacity 800ms 1000ms ease;
    &>div {
      display: none;
    }
    &.show {
      opacity: 1;
      &>div {
        display: block;
      }
    }
    @media (max-width: 374px) {
      display: none;
    }
  }
`

const Page = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`

export default class Root extends React.Component {
  render() {
    return (
      <Page>
        <Slides
          slides={slides}
          background={colors.background}
          toShowBookmark={this.toShowBookmark}
        />
      </Page>
    )
  }
}
