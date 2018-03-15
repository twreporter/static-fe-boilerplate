import { FullpageSlides } from '@twreporter/react-components/lib/fullpage-slides'
import { injectGlobal } from 'styled-components'
import slidesMeta from '../data/slides-meta'
import React from 'react'
import slides from '../data/slides'

// eslint-disable-next-line no-unused-expressions
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
  body {
    font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", Roboto, "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  }
  #root: {
    height: 100%;
    overflow: hidden;
  }
  * {
    box-sizing: border-box;
  }
`

const Slides = () => <FullpageSlides title={slidesMeta.headerTitle} slides={slides} blankAudioSrc={slidesMeta.blankAudioSrc} />

export default Slides
