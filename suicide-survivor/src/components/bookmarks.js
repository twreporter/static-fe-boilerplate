import { mediaScreen } from '../styles/utils'
import { WidgetFrame, MobileWidgetFrame } from './utils/widgets'
import config from '../config.js'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const HOST = config.host

const bookmarkData = {
  slug: 'walk-with-survivor-of-suicide-gcs',
  host: 'https://www.twreporter.org',
  style: 'interactive',
  title: '倖存者的餘聲——自殺者遺族的漫長旅途',
  desc: '醫療錯誤並不罕見，也並非基於故意。重點是如何避免錯誤或錯誤再犯，以及如何對醫療錯誤做出補救與補償。',
  thumbnail: 'https://storage.googleapis.com/twreporter-infographics/walk-with-survivor-of-suicide-gcs/static/coverphoto_mobile.jpg',
  category: '生活．醫療',
  published_date: '2017-11-18T08:00:00+08:00',
}

const bookmarkPostMessage = {
  bookmarkData,
  svgColor: '',
}

const DesktopWidgetContainer = styled.div`
  position: fixed;
  z-index: 15;
  bottom: 5%;
  left: 65px;
  ${mediaScreen.tabletBelow`
    display: none;
  `}
`

const MobileWidgetContainer = styled.div`
  position: fixed;
  z-index: ${props => (props.showMobile ? 5 : -1)};
  bottom: 6.5%;
  right: 4%;
  display: none;
  ${mediaScreen.tabletBelow`
    display: initial;
  `}
  opacity: ${props => (props.showMobile ? '1' : '0')};
  transition: opacity 200ms linear;
`

const Container = styled.div`
  display: ${props => (props.ifshowUp ? 'initial' : 'none')};
  transition: all 300ms linear;
`

const MOBILE = 'mobile'
const TABLET = 'TABLET'
const DESKTOP = 'desktop'

const getScreenType = (width) => {
  if (width < 768) {
    return MOBILE
  } else if (width >= 768 && width < 1024) {
    return TABLET
  }
  return DESKTOP
}

class Bookmarks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showMobile: false,
    }
    this.onScroll = this._onScroll.bind(this)
    this.screenType = ''
    this.distance = 0
    this.lastScroll = 0
  }

  componentDidMount() {
    const postMessage = (id) => {
      const bookmarkElement = document.getElementById(id)
      bookmarkElement.onload = () => {
        bookmarkElement.contentWindow.postMessage(JSON.stringify(bookmarkPostMessage), `${HOST}`)
      }
    }
    postMessage('desktopBookmarkIcon')
    postMessage('mobileBookmarkIcon')

    window.addEventListener('scroll', this.onScroll)

    this.screenType = getScreenType(window.innerWidth)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this._onScroll)
    // scrollPosition.y = 0
  }

  _onScroll() {
    const currentTopY = window.scrollY
    const { showMobile } = this.state
    this.displacement = currentTopY - this.lastScroll
    if ((-1) * this.displacement > 150) {
      this.lastScroll = currentTopY
      if (showMobile === false) {
        this.setState({
          showMobile: true,
        })
      }
    }
    if (this.displacement > 30) {
      this.lastScroll = currentTopY
      if (showMobile === true) {
        this.setState({
          showMobile: false,
        })
      }
    }
  }

  render() {
    return (
      <Container
        ifshowUp={this.props.ifshowUp}
      >
        <DesktopWidgetContainer>
          <WidgetFrame
            id="desktopBookmarkIcon"
            title="bookmark-widget"
            src={`${HOST}/widgets-bookmark-desktop`}
            scrolling="no"
          />
        </DesktopWidgetContainer>
        <MobileWidgetContainer
          showMobile={this.state.showMobile}
        >
          <MobileWidgetFrame
            id="mobileBookmarkIcon"
            title="bookmark-widget"
            src={`${HOST}/widgets-bookmark-mobile`}
            scrolling="no"
          />
        </MobileWidgetContainer>
      </Container>
    )
  }
}

Bookmarks.defaultProps = {
  ifshowUp: false,
}

Bookmarks.propTypes = {
  ifshowUp: PropTypes.bool,
}


export default Bookmarks
