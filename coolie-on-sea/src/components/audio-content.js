import { SubtitleContainer, TextFrame, IconContainerPrototype } from './common-components'
// import PauseIcon from '../../static/pause.svg'
// import PlayIcon from '../../static/play.svg'
import imgSrc from '../data/img-src'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import Subtitle from './subtitle'
import Waypoint from 'react-waypoint'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const SubtitleBox = styled.div `
  position: absolute;
  top: 50%;
  left: 50%;
  width: 30%;
  transform: translate(-150%, -100%);
  ${screen.tabletBelow`
    top: auto;
    bottom: 0;
    left: 50%;
    width: 90%;
    transform: translate(-50%,0);
  `}
`

const PBContainer = styled.div`
  bottom: 70px;
  ${screen.tabletOnly`
    bottom: 105px;
  `};
  ${screen.mobileBelow`
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
  ${screen.mobileBelow`
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
  ${screen.mobileBelow`
    background-color: white;
  `};
`

const FisherTell = styled.div`
  display: flex;
  align-items: center;
  transform: translateY(-125%);
  ${screen.tabletBelow`
    flex-direction: row-reverse;
    justify-content: flex-end;
  `}
`

const PlayContainer = styled.div`
  position: relative;
  ${screen.desktopAbove`
    margin-left: 12px;
  `}
  ${screen.tabletBelow`
    margin-right: 12px;
  `}
`

const IconContainer = IconContainerPrototype.extend`
  width: 30px;
  height: 30px;
  opacity: ${props => (props.ifShowUp ? '1' : '0')};
  transition: opacity 300ms ease-in-out;
  img {
    width: 100%;
  }
  ${screen.mobileBelow`
    width: 31px;
    height: 31px;
  `};
`

const Name = styled.img`
  width: 115px;
  height: 42px;
`

class AnimationPlayButton extends React.PureComponent {
  render() {
    const { ifPlaying, onClick } = this.props
    return (
      <PlayContainer
        onClick={onClick}
      >
        <IconContainer
          ifShowUp={ifPlaying}
        >
          {/* <PauseIcon /> */}
          <img src={imgSrc['soundOn']}/>
        </IconContainer>
        {/* <IconContainer
          ifShowUp={!ifPlaying}
        >
          <PlayIcon />
          <img src={imgSrc['soundOn']}/>
        </IconContainer> */}
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
      currentTime, duration, durationBarColor, currentBarColor,
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
          backgroundColor={durationBarColor}
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
  durationBarColor: PropTypes.string.isRequired,
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
    const { file, audioInitiated } = this.props
    const audio = new Audio(file)
    this.audio = audio
    audioInitiated(audio)
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
          <SubtitleBox>
            <FisherTell>
              <Name src={imgSrc['name_1']} />
              <AnimationPlayButton
                ifPlaying={this.state.ifPlaying}
                onClick={this.onClickPlay}
              />
            </FisherTell>
            <SubtitleContainer>
              <CatchPhrase
                ifHide={this.state.ifHide}
              >
                <mark>{catchphrase}</mark>
              </CatchPhrase>
            </SubtitleContainer>
            <Subtitle
              subtitles={subtitles}
              currentTime={currentTime}
            />
            {/* <ProgressBar
              currentTime={this.state.currentTime}
              duration={this.audio.duration || 0}
              durationBarColor={this.props.durationBarColor}
              currentBarColor={this.props.currentBarColor}
            /> */}
          </SubtitleBox>
        </Container>
      </Waypoint>
    )
  }
}

TWAudio.propTypes = {
  content: PropTypes.shape({
    file: PropTypes.string.isRequired,
    durationBarColor: PropTypes.string.isRequired,
    currentBarColor: PropTypes.string.isRequired,
    subtitles: PropTypes.array.isRequired,
    audioInitiated: PropTypes.func.isRequired,
    catchphrase: PropTypes.string.isRequired,
  })
}


export default TWAudio
