/* eslint no-console:0 */
import BaseComponents from './base'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import playIcon from '../../static/play.png'
import pauseIcon from '../../static/pause.png'
import screen from '../screen'
import styled from 'styled-components'
import underlineImg from '../../static/line.png'

const InfoBox = BaseComponents.SmallContainer.extend`
  position: relative;
  top: -3px;
  width: 100%;
  display: block;
  margin: 0 auto;
  > img {
    display: block;
    margin-bottom: 20px;
  }
`

const FlexItems = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${screen.mobileOnly`
    flex-wrap: wrap;
  `}
`

const FlexItem = styled.img`
  flex: 0 1 auto;
  max-width: 100%;
  height: ${props => props.height};

  ${screen.mobileOnly`
    order: ${props => props.mobileOrder};
    margin-top: ${props => (props.isLast ? '20px' : '0px')};
  `}
`

const Container = BaseComponents.MediumContainer.extend`
  margin: 30px auto;
  cursor: pointer;
  > video {
    display: block;
  }
`

class Video extends React.PureComponent {
  constructor(props) {
    super(props)
    this.onLoadedData = this._onLoadedData.bind(this)
    this.onEnded = this._onEnded.bind(this)
    this.toggleVideo = this._toggleVideo.bind(this)
    this.onEnter = this._onEnter.bind(this)
    this.onLeave = this._onLeave.bind(this)
    this.handlePlayer = this._handlePlayer.bind(this)
    this.wasPlayingInThePreviousStage = this.props.isAutoPlay
    this.state = {
      toPlay: false,
    }
  }

  componentDidMount() {
    const { initialVideo } = this.props
    if (this.player) {
      initialVideo(this.player)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.wasPlayingInThePreviousStage = nextProps.isAutoPlay
  }

  _handlePlayer(toPlay) {
    if (this.player) {
      const playPromise = this.player.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (toPlay) {
              this.player.play()
              const tmpCurrentTime = this.player.currentTime

              // ** WORKAROUND **
              // The problem is when we pause the video for a while,
              // and it will not be played again.
              // Hence, we need to reload it again
              setTimeout(() => {
                if (this.player.currentTime === tmpCurrentTime || this.player.currentTime === 0) {
                  this.player.load()
                  this.player.play()
                }
              }, 2000)
            } else {
              this.player.pause()
            }
            this.setState({
              toPlay,
            })
          })
          .catch((error) => {
            console.warn('playing video occurs error', error)
            this.setState({
              toPlay: false,
            })
          })
      }
    }
  }

  _toggleVideo() {
    const { toPlay } = this.state
    this.handlePlayer(!toPlay)
    this.wasPlayingInThePreviousStage = !toPlay
  }

  _onEnter() {
    this._onEnterTime = Date.now()

    if (this.player && this.wasPlayingInThePreviousStage) {
      // add buffer to prevent from rapid scroll
      setTimeout(() => {
        if (this._onEnterTime > 0) {
          this.player.currentTime = 0
          this.handlePlayer(true)
        }
      }, 1000)
    }
  }

  _onLeave() {
    this._onEnterTime = 0

    if (this.player) {
      this.handlePlayer(false)
    }
  }

  _onEnded() {
    this.setState({
      toPlay: false,
    })
    if (this.player) {
      this.player.currentTime = 0
    }
  }

  _onLoadedData() {
    const { content } = this.props
    console.log(
      'video loaded, could be %s or %s',
      this._getFullSrc(content[1]),
      this._getFullSrc(content[2]),
    )
  }

  _getFullSrc(src) {
    /*
    if (process.env.NODE_ENV === 'production') {
      return `https://www.twreporter.org/videos/unjust-imprisonment/${src}`
    }
    */
    return `static/${src}`
  }

  render() {
    const { content } = this.props
    const { toPlay } = this.state
    return (
      <Waypoint
        onEnter={this.onEnter}
        onLeave={this.onLeave}
        bottomOffset="60%"
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <Container>
          <video
            autoPlay
            muted
            onClick={this.toggleVideo}
            onEnded={this.onEnded}
            onLoadedData={this.onLoadedData}
            playsInline
            poster={content[0]}
            preload="none"
            ref={(node) => { this.player = node }}
            width="100%"
          >
            <source
              src={this._getFullSrc(content[1])}
              type="video/webm"
            />
            <source
              src={this._getFullSrc(content[2])}
              type="video/mp4"
            />
          </video>
          <InfoBox>
            <img width="100%" src={underlineImg} alt="underline of video" role="presentation" />
            <FlexItems>
              <FlexItem src={toPlay ? pauseIcon : playIcon} onClick={this.toggleVideo} role="presentation" mobileOrder="2" height="55px" />
              <FlexItem src={content[3]} role="presentation" mobileOrder="1" height="50px" />
              <FlexItem src={content[4]} role="presentation" mobileOrder="3" isLast height="50px" />
            </FlexItems>
          </InfoBox>
        </Container>
      </Waypoint>
    )
  }
}

Video.propTypes = {
  content: PropTypes.array.isRequired,
  initialVideo: PropTypes.func.isRequired,
  isAutoPlay: PropTypes.bool.isRequired,
}

export default Video
