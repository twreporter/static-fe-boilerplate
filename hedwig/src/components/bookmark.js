import config from '../config.js'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const HOST = config.host

const MobileWidgetFrame = styled.iframe`
  height: 52px;
  width: 52px;
  border: none;
  overflow: hidden;
  position: relative;
`

const bookmarkData = {
  slug: 'hedwig-and-the-angry-inch-artist',
  host: 'https://www.twreporter.org',
  style: 'interactive',
  title: '【搖滾芭比專題】我是新柏林圍牆，來拆毀我吧！──創作者畫筆下的Hedwig',
  desc: '人是否能尋回失落的另一半？我們邀請了6位創作者，用他們的筆，畫下最觸動他們的Hedwig。',
  thumbnail: 'https://storage.googleapis.com/twreporter-infographics/hedwig-and-the-angry-inch-artist/static/leading-img-mobile.jpg',
  category: '文化．藝術',
  published_date: '2017-10-30T08:00:00+08:00',
}

const bookmarkPostMessage = {
  bookmarkData,
}

const MobileWidgetContainer = styled.div`
  position: fixed;
  z-index: ${props => (props.showMobile ? 5 : -1)};;
  bottom: 6.5%;
  right: 4%;
  opacity: ${props => (props.showMobile ? '1' : '0')};
  transition: opacity 200ms linear;
`

const Container = styled.div`
  display: ${props => (props.ifshowUp ? 'initial' : 'none')};
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

class Bookmark extends React.Component {
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
    const { showMobile } = this.state
    const { ifshowUp } = this.props
    return (
      <Container
        ifshowUp={ifshowUp}
      >
        <MobileWidgetContainer
          showMobile={showMobile}
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

Bookmark.defaultProps = {
  ifshowUp: false,
}

Bookmark.propTypes = {
  ifshowUp: PropTypes.bool,
}


export default Bookmark
