import { CPAP, SubtitleContainer, TextFrame, IconContainerPrototype } from './common-components'
import mq from '../../utils/media-query'
import pathProcessor from '../../utils/path-processor'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Waypoint from 'react-waypoint'
import Subtitle from './subtitle'
import PlayIcon from '../../../static/play.svg'
import PauseIcon from '../../../static/pause.svg'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const PBContainer = CPAP.extend`
  bottom: 70px;
  ${mq.tablet`
    bottom: 105px;
  `};
  ${mq.mobile`
    bottom: 30px;
  `};
`

const CatchPhrase = TextFrame.extend`
  opacity: ${props => (props.ifHide ? '0' : '1')};
`

const DurationBar = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  height: 2px;
  background-color: ${props => props.backgroundColor};
  width: 100%;
  ${mq.mobile`
    background-color: white;
    opacity: 0.3;
  `};
`

const CurrentTimeBar = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  height: 2px;
  background-color: ${props => props.backgroundColor};
  ${mq.mobile`
    background-color: white;
  `};
`

const PlayContainer = CPAP.extend`
  top: 26%;
  ${mq.mobile`
    width: 31px;
    height: 31px;
    top: 18px;
    right: 18px;
    transform: none;
  `};
`

const IconContainer = IconContainerPrototype.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: 58px;
  height: 58px;
  opacity: ${props => (props.ifShowUp ? '1' : '0')};
  transition: opacity 300ms ease-in-out;
  ${mq.mobile`
    width: 31px;
    height: 31px;
  `};
`

/*  Original Design wave-style button
const PlayContainer = styled.div`
  position: absolute;
  transform: translate(-50%, +50%);
  &:hover {
    cursor: pointer;
  }
  bottom: 70px;
  right: 40px;
  ${mq.desktop`
    right: 30px;
  `};
  ${mq.tablet`
    right: 40px;
  `};
  ${mq.mobile`
    bottom: initial;
    right: 30px;
    top: 30px;
    transform: none;
  `};
`

const PlayingAnima = keyframes`
  20% {
    transform: scaleY(2)
  }
  to {
    transform: scaleY(1)
  }
`
const PlayColumn = styled.div`
  display: inline-block;
  height: 9px;
  width: 1px;
  background-color: white;
  margin-right: 3px;
  transform: translateZ(0);
  will-change: transform;
  animation: ${(props) => {
    if (props.ifPlaying && props.index % 2 !== 0) {
      return `${PlayingAnima} ${props.animDuration}s ${props.animDuration}s ease-in-out infinite;`
    }
    if (props.ifPlaying) {
      return `${PlayingAnima} ${props.animDuration}s ease-in-out infinite;`
    }
  }};
  `
*/

class AnimationPlayButton extends React.PureComponent {
  render() {
    const { ifPlaying, onClick } = this.props
    /* Original Design wave-style button
    const columns = (() => {
      return [1.5, 1.8, 1.9, 1.7, 1.6].map((v, i) => {
        return <PlayColumn key={`column_${v}`} animDuration={v} ifPlaying={ifPlaying} index={i} />
      })
    })()
    return (
      <PlayContainer
        onClick={onClick}
      >
        {columns}
      </PlayContainer>
    )
    */
    return (
      <PlayContainer
        onClick={onClick}
      >
        <IconContainer
          ifShowUp={ifPlaying}
        >
          <PauseIcon />
        </IconContainer>
        <IconContainer
          ifShowUp={!ifPlaying}
        >
          <PlayIcon />
        </IconContainer>
      </PlayContainer>
    )
  }
}

AnimationPlayButton.defaultProps = {
  ifPlaying: false,
  onClick: () => {},
}

AnimationPlayButton.propTypes = {
  ifPlaying: PropTypes.bool,
  onClick: PropTypes.func,
}

const durationBarId = 'durationBar'
class ProgressBar extends React.Component {
  render() {
    const {
      currentTime, duration, duratoinBarColor, currentBarColor,
    } = this.props
    let durationBar
    let durationBarWidth
    if (typeof document !== 'undefined') {
      durationBar = document.getElementById(durationBarId)
      durationBarWidth = durationBar.offsetWidth
    }
    const slope = (currentTime / duration)
    const ctbStyle = {
      width: slope * durationBarWidth || 0,
    }
    return (
      <PBContainer>
        <DurationBar
          id={durationBarId}
          backgroundColor={duratoinBarColor}
        />
        <CurrentTimeBar
          style={ctbStyle}
          backgroundColor={currentBarColor}
        />
      </PBContainer>
    )
  }
}

ProgressBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  duratoinBarColor: PropTypes.string.isRequired,
  currentBarColor: PropTypes.string.isRequired,
}

class TWAudio extends React.Component {
  constructor(props) {
    super(props)
    this.audio = {}
    this.setInterval = {}
    this.onClickPlay = this._onClickPlay.bind(this)
    this.play = this._play.bind(this)
    this.stop = this._stop.bind(this)
    this.state = {
      ifPlaying: false,
      currentTime: 0,
      ifHide: false,
    }
  }

  componentDidMount() {
    const { file, audioInitated } = this.props
    const audio = new Audio(pathProcessor(file))
    this.audio = audio
    audioInitated(audio)
  }

  _currentTTracking = () => {
    this.setInterval = setInterval(() => {
      // console.log('currentTime: ', this.audio.currentTime)
      this.setState({
        currentTime: this.audio.currentTime,
      })
      if (this.audio.currentTime >= this.audio.duration) {
        this.audio.currentTime = 0
        this._stop()
      }
    }, 250)
  }

  _currentTTrackingCancel = () => {
    clearInterval(this.setInterval)
  }

  _play() {
    this.audio.play()
    this.setState({
      ifPlaying: true,
      ifHide: true,
    })
    this._currentTTracking()
  }

  _stop() {
    this.audio.pause()
    this.setState({
      ifPlaying: false,
    })
    this._currentTTrackingCancel()
  }

  _onClickPlay() {
    if (this.state.ifPlaying) {
      this._stop()
    } else {
      this._play()
    }
  }

  render() {
    const { subtitles, catchphrase } = this.props
    const { currentTime } = this.state
    return (
      <Waypoint
        onEnter={this.play}
        onLeave={this.stop}
        bottomOffset="79%"
        topOffset="20%"
        fireOnRapidScroll
      >
        <Container>
          <SubtitleContainer>
            <CatchPhrase
              ifHide={this.state.ifHide}
            >
              {catchphrase}
            </CatchPhrase>
          </SubtitleContainer>
          <Subtitle
            subtitles={subtitles}
            currentTime={currentTime}
          />
          <ProgressBar
            currentTime={this.state.currentTime}
            duration={this.audio.duration || 0}
            duratoinBarColor={this.props.duratoinBarColor}
            currentBarColor={this.props.currentBarColor}
          />
          <AnimationPlayButton
            ifPlaying={this.state.ifPlaying}
            onClick={this.onClickPlay}
          />
        </Container>
      </Waypoint>
    )
  }
}

TWAudio.propTypes = {
  file: PropTypes.string.isRequired,
  duratoinBarColor: PropTypes.string.isRequired,
  currentBarColor: PropTypes.string.isRequired,
  subtitles: PropTypes.array.isRequired,
  audioInitated: PropTypes.func.isRequired,
  catchphrase: PropTypes.string.isRequired,
}


export default TWAudio
