import { FullpageSlides } from '@twreporter/react-components'
import { injectGlobal } from 'styled-components'
import slidesMeta from '../data/slides-meta'
import React from 'react'
import slides from '../data/slides'
import pageMeta from '../data/page-meta'

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

const bookmarkData = {
  slug: 'high-risk-youth-life-is-a-struggle',
  host: 'https://www.twreporter.org',
  style: 'interactive',
  title: pageMeta.title,
  desc: pageMeta.description,
  thumbnail: 'https://storage.googleapis.com/twreporter-infographics/high-risk-youth-life-is-a-struggle/static/mobile/mobile-001-768x1024-bg.jpg',
  category: '人權．社會',
  published_date: '2017-11-01T08:00:00+08:00',
}

const bookmarkPostMessage = {
  bookmarkData,
  svgColor: 'white',
}

const Slides = () => <FullpageSlides title={slidesMeta.headerTitle} slides={slides} blankAudioSrc={slidesMeta.blankAudioSrc} bookmarkPostMessage={bookmarkPostMessage} />

export default Slides
