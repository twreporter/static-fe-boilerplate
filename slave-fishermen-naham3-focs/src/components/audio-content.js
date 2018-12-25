import PropTypes from 'prop-types'
import React from 'react'
import Subtitle from './subtitle'
import Waypoint from 'react-waypoint'
import imgSrc from '../data/img-src'
import mockup from '../constants/mockup'
import screen from '../utils/screen'
import styled from 'styled-components'
import { IconContainerPrototype, OnlyDisplayOnMobileBelow, OnlyDisplayOnTabletAbove} from './common-components'

const nameSeparator = '／'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const BgMask = styled.div`
  opacity: ${props => props.hideonFirstTouch ? '0' : '1'};
  transition: opacity .5s linear;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(13, 19, 25, 0.7);
`

const Story = styled.div`
  position: absolute;
  display: block;
  ${screen.hdAbove`
    left: calc( 110 / ${mockup.hd.width} * 100%);
    bottom: calc( 110 / ${mockup.hd.height} * 100%);
  `}
  ${screen.desktopOnly`
    left: calc( 90 / ${mockup.desktop.width} * 100%);
    bottom: calc( 80 / ${mockup.desktop.height} * 100%);
  `}
  ${screen.tabletOnly`
    left: calc((90 / ${mockup.tablet.width}) * 100%);
    bottom: calc((100 / ${mockup.tablet.height}) * 100%);
    width: calc(100% - ((90 / ${mockup.tablet.width} * 100%) * 2));
  `}
  ${screen.mobileBelow`
    left: calc((25 / ${mockup.mobile.width}) * 100%);
    bottom: ${props => props.ifPlaying ? `calc((18 / ${mockup.mobile.height}) * 100%)` : '50%'};
    transform: translate(0, ${props => props.ifPlaying ? '0' : '150%'});
    width: calc(100% - ((24 / ${mockup.mobile.width} * 100%) * 2));
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

const CatchPhrase = styled.p`
  font-family: "source-han-serif-tc", "serif", "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
  color: #f2f2f2;
  ${screen.hdAbove`
    font-size: 36px;
  `}
  ${screen.desktopOnly`
    font-size: 28px;
  `}
  ${screen.tabletOnly`
    font-size: 28px;
    padding: 0 20%;
  `}
  ${screen.mobileBelow`
    margin: 0 calc(34 / ${mockup.mobile.width} * 100%);
    font-size: 24px;
    text-align: justify;
    transform: translate(0, -25%);
  `}
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

const Teller = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
  padding: 4px;
  cursor: pointer;
  background: #000;
  ${screen.desktopAbove`
    background: ${props => props.isHovered ? '#b15c76':'#000000'};
  `}
  ${screen.tabletBelow`
    display: inline-flex;
  `}
`

const StoryBlockText = styled.p`
  font-family: "source-han-serif-tc", "serif", "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  margin: 0;
  color: #808080;
  ${screen.hdAbove`
    font-size: 24px;
  `}
  ${screen.desktopAbove`
    color: ${props => props.isHovered ? '#0d1319':'#808080'};
  `}
  ${screen.desktopOnly`
    font-size: 20px;
  `}
  ${screen.tabletOnly`
    font-size: 20px;
  `}
`

const Name = StoryBlockText.extend`
  ${screen.tabletAbove`
    &:after {
     content: '，'
    }
  `}
  ${screen.mobileBelow`
    font-size: 24px;
  `}
`

const StoryTitle = StoryBlockText.extend`
  ${screen.mobileBelow`
    display: ${props => props.hideonFirstTouch ? 'none' : 'inline-block'};
    padding: 0 10px;
    margin: calc((11 / ${mockup.mobile.height}) * 100%) 0 0 0;
    background: #000000;
    font-size: 18px;
  `}
`

const PlayContainer = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  ${screen.mobileBelow`
    width: 31px;
    height: 31px;
  `}
`

const IconContainer = IconContainerPrototype.extend`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.ifShowUp ? '1' : '0')};
  transition: opacity 300ms ease-in-out;
`

const Icon = styled.div`
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(${props => props.default});
  ${screen.desktopAbove`
    background-image: ${props => props.hovered ? `url(${props.hover})` : `url(${props.default})`};
  `}
`

const CountDownSeconds = styled.p`
  color: ${props => props.isHovered ? '#e2e2e2':'#6f3e51'};
  margin: 0 10px 0 5.5px;
  ${screen.hdAbove`
    font-size: 24px;
  `}
  ${screen.desktopOnly`
    font-size: 20px;
  `}
  ${screen.tabletOnly`
    font-size: 20px;
  `}
  ${screen.mobileBelow`
    font-size: 24px;
  `}
`

class AnimationPlayButton extends React.PureComponent {
  render() {
    const { ifPlaying, isHovered, onClick } = this.props
    return (
      <PlayContainer
        onClick={onClick}
      >
        <IconContainer
          ifShowUp={ifPlaying}
        >
          <Icon
					  hovered={isHovered}
            default={imgSrc['pause']}
            hover={imgSrc['pause_hover']}
          />
        </IconContainer>
        <IconContainer
          ifShowUp={!ifPlaying}
        >
          <Icon 
					  hovered={isHovered}
            default={imgSrc['play']}
            hover={imgSrc['play_hover']}
          />
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
		this.handleMouseEnter = this._handleMouseEnter.bind(this)
		this.handleMouseLeave = this._handleMouseLeave.bind(this)
    this.getCountDownSeconds = this._getCountDownSeconds.bind(this)
    this.state = {
      ifPlaying: false,
      currentTime: 0,
      hideonFirstTouch: false,
			isTellerBlockHovered: false
    }
  }

  componentDidMount() {
    const { file, audioInitiated } = this.props
    const audio = new Audio(file)
    this.audio = audio
    audioInitiated(audio)
  }

  componentDidUpdate() {
    const { pauseAll } = this.props
    if (pauseAll) {
     this.stop()
    }
  }

  componentWillUnMount() {
	  this.audio = null
		this.setInterval = null
  }

  _currentTTracking = () => {
    this.setInterval = setInterval(() => {
      //console.log('currentTime: ', this.audio.currentTime)
      this.setState({
        currentTime: this.audio.currentTime,
      })
      if (this.audio.currentTime >= this.audio.duration) {
        this.audio.currentTime = 0
        this.stop()
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
      hideonFirstTouch: true,
    })
    this._currentTTracking()
  }

  _stop() {
    this.audio.pause()
    this.setState({
      ifPlaying: false,
    })
    this._currentTTrackingCancel()
    this.props.resetPauseState()
  }

  _onClickPlay() {
    if (this.state.ifPlaying) {
      this.stop()
    } else {
      this.play()
    }
	}

  _getCountDownSeconds() {
    const seconds = Math.floor(this.audio.duration - this.state.currentTime)
    if (seconds) {    
      if (seconds < 10) {
        return `0${seconds}`
      }
      return seconds
    }
    return '00'
  }

  _handleMouseLeave(e) {
	  e.preventDefault()
    this.setState({
		  isTellerBlockHovered: false
		})
	}

  _handleMouseEnter(e) {
	  e.preventDefault()
    this.setState({
		  isTellerBlockHovered: true
		})
	}

  render() {
    const { subtitles, catchphrase, pauseAllAudios, storyteller, storytitle } = this.props
    const { ifPlaying, hideonFirstTouch, currentTime, isTellerBlockHovered } = this.state
    const countDownSeconds = this.getCountDownSeconds()

    return (
      <Waypoint
			  onEnter={pauseAllAudios}
        onLeave={this.stop}
        bottomOffset="50%"
        fireOnRapidScroll
      >
        <Container>
          <BgMask 
            hideonFirstTouch={hideonFirstTouch}
          >
            <CatchPhrase>
              「{catchphrase}」
            </CatchPhrase>
          </BgMask>
          <Story
            ifPlaying={ifPlaying}
          >
            <Subtitle
              subtitles={subtitles}
              currentTime={currentTime}
            />
            <Teller
             isHovered={isTellerBlockHovered}
						 onMouseEnter={this.handleMouseEnter}
						 onMouseLeave={this.handleMouseLeave}
             onClick={this.onClickPlay}
						>
              <AnimationPlayButton
                ifPlaying={ifPlaying}
								isHovered={isTellerBlockHovered}
              />
              <CountDownSeconds
							  isHovered={isTellerBlockHovered}
							>
							  {`00:${countDownSeconds}`}
							</CountDownSeconds>
              <Name
							  isHovered={isTellerBlockHovered}
							>
                {storyteller}
              </Name>
              <OnlyDisplayOnTabletAbove>
                <StoryTitle
							    isHovered={isTellerBlockHovered}
                >
                  {storytitle}
                </StoryTitle>
              </OnlyDisplayOnTabletAbove>
            </Teller>
            <OnlyDisplayOnMobileBelow>
              <StoryTitle
                hideonFirstTouch={hideonFirstTouch}
					      isHovered={isTellerBlockHovered}
              >
                {storytitle}
              </StoryTitle>
            </OnlyDisplayOnMobileBelow>
            {/* <ProgressBar
              currentTime={this.state.currentTime}
              duration={this.audio.duration || 0}
              durationBarColor={this.props.durationBarColor}
              currentBarColor={this.props.currentBarColor}
            /> */}
          </Story>
        </Container>
      </Waypoint>
    )
  }
}

TWAudio.propTypes = {
  file: PropTypes.string.isRequired,
  durationBarColor: PropTypes.string.isRequired,
  currentBarColor: PropTypes.string.isRequired,
  subtitles: PropTypes.array.isRequired,
  audioInitiated: PropTypes.func.isRequired,
  catchphrase: PropTypes.string.isRequired,
  pauseAll: PropTypes.bool.isRequired,
  pauseAllAudios: PropTypes.func.isRequired,
  resetPauseState: PropTypes.func.isRequired
}

export default TWAudio
