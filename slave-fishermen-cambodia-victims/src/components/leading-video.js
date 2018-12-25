import BaseComponents from './base'
import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import screen from '../utils/screen'
import styled, { css } from 'styled-components'

const Container = BaseComponents.MobileLargeContainer.extend`
  position: relative;
  margin: 0 auto 40px;
  height: calc(${props => props.ratio} * 100vw);

  ${screen.tabletOnly`
    height: calc(${props => props.ratio} * ${layout.tablet.width.medium}px);
  `};

  ${screen.desktopOnly`
    height: calc(${props => props.ratio} * ${layout.desktop.width.medium}px);
  `};

  ${screen.hdAbove`
    height: calc(${props => props.ratio} * ${layout.hd.width.medium}px);
  `};
`

const Video = styled.video`
  display: block;
  width: 100%;
`

const VideoMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);
`

const audioBtnStyle = css`
  width: 45px;
  height: auto;
  left: 15px;
  bottom: 13px;
  position: absolute;
  cursor: pointer;
  z-index: 50;
  opacity: ${props => props.show ? 1 : 0};
  transition: opacity .25s ease-in-out;
  ${screen.tabletAbove`
    width: 54px;
    bottom: 30px;
    left: 30px;
  `}
`

const StyledSoundMuteIcon = styled.img`${audioBtnStyle}`
const StyledSoundOnIcon = styled.img`${audioBtnStyle}`

class LeadingVideo extends React.PureComponent {
  constructor(props) {
    super(props)
    this._isSoundOn = false
    this.state = {
      isPlaying: false,
      isMuted: props.mute
    }
    this.handleMuteChange = this._handleMuteChange.bind(this)
    this.onLeave = this._onLeave.bind(this)
    this.onEnter = this._onEnter.bind(this)
    this.onPlayEnd = this._onPlayEnd.bind(this)
  }
  componentDidMount() {
    if (this._player) {
      this._player.addEventListener('ended', this.onPlayEnd, false)
    }
  }
  componentWillUnmount() {
    this._player.removeEventListener('ended', this.onPlayEnd, false)
    this._isSoundOn = null
  }
  _onPlayEnd() {
    this.setState({
      isPlaying: false
    })
  }
  _handleMuteChange() {
    if (this._player) {
      this._player.muted = !this._player.muted

      if (this._player.muted) {
        this._isSoundOn = false
      } else {
        this._isSoundOn = true
      }

      this.setState({
        isMuted: !this.state.isMuted
      })
    }
  }

  _onEnter() {
    // if video is in the viewport,
    // and it can play sound,
    // turn on the audio again.
    const { isMuted } = this.state
    if (this._player) {
      if (!isMuted) {
        this.setState({
          isMuted: true,
        })
        this._player.muted = true
      }
      this.setState({
        isPlaying: true
      })
      this._player.play()
    }
  }

  _onLeave() {
    // if video is not in the viewport,
    // pause the audio.
    if (this._player) {
      if (!this._player.paused) {
        this.setState({
          isPlaying: false
        })
        this._player.pause()
      }
    }
  }

  render() {
    const { content } = this.props
    const { filetype, loop, poster, src, title, size } = content[0]
    const { isMuted, isPlaying } = this.state

    // On the mobile devices (iOS 10 above),
    // we can only autoplay the video without audio
    return (
      <Waypoint
        onLeave={this.onLeave}
        onEnter={this.onEnter}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <Container
          itemScope
          itemType="http://schema.org/VideoObject"
          ratio={size.height / size.width}
        >
          <LazyLoad once={true} offset={1500} height={'100%'}>
            <React.Fragment>
              <link itemProp="url" href={src} />
              <meta itemProp="name" content={title} />
              <meta itemProp="thumbnail" content={poster} />
              <Video
                innerRef={(input) => { this._player = input }}
                playsInline
					    	preload="metadata"
                muted={isMuted}
              >
                <source src={src} type={filetype} />
              </Video>
              <VideoMask />
              {isMuted ?
                <StyledSoundMuteIcon
                  src={imgSrc['mute']}
                  onClick={this.handleMuteChange}
                  show={isPlaying}
                /> :
                <StyledSoundOnIcon
                  src={imgSrc['soundOn']}
                  onClick={this.handleMuteChange}
                  show={isPlaying}
                />
              }
            </React.Fragment>
          </LazyLoad>
        </Container>
      </Waypoint>
    )
  }
}

LeadingVideo.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({
    filetype: PropTypes.string,
    loop: PropTypes.bool,
    mute: PropTypes.bool,
    poster: PropTypes.string,
    src: PropTypes.string.isRequired,
    title: PropTypes.string,
    size: PropTypes.object
   })).isRequired,
}

LeadingVideo.defaultProps = {
  content: [{ 
    filetype: 'mp4',
    loop: false,
    mute: true,
    poster: '',
    src: '',
    title: '',
    size: {
      "width": 880,
      "height": 495
    }
  }]
}

export default LeadingVideo
