// TODO: add lazyload

import LazyLoad from 'react-lazyload'
import PropTypes from 'prop-types'
import React from 'react'
import TWAudio from './audio-content'
import Waypoint from 'react-waypoint'
import audioSrc from '../data/audio-src'
import imgSrc from '../data/img-src'
import isNode from 'detect-node'
import mockup from '../constants/mockup'
import screen from '../utils/screen'
import styled from 'styled-components'
import subtitleSrc from '../data/subtitles/subtitle-src'
import { fadeIn } from '../utils/animations'

let Stickyfill
if (!isNode){
  Stickyfill = require('stickyfilljs')
}

const Container = styled.div`
  width: 100%;
`

const AudioSectionBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center 3%;
  background-image: url(${props => props.mobile});
  animation: ${fadeIn} 900ms ease 1200ms both;
  ${screen.tabletOnly`
    background-image: url(${props => props.tablet});
  `}
  ${screen.desktopAbove`
    background-image: url(${props => props.desktop});
  `}
`

const AudioContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: calc(100vw * (${mockup.mobile.height} / ${mockup.mobile.width}));
  ${screen.tabletOnly`
    height: calc(100vw * (${mockup.tablet.height} / ${mockup.tablet.width}));
  `}
  ${screen.desktopAbove`
    height: 100vh;
  `}
`

class StoryBox extends React.PureComponent {
  constructor(props){
    super(props)
    this.state = {
      pauseAll: false
    }
    this.audioInitiated = this._audioInitiated.bind(this)
    this.pauseAllAudios = this._pauseAllAudios.bind(this)
    this.resetPauseState = this._resetPauseState.bind(this)
		this.audios = []
  }

	componentDidMount(){
    const audioContainers = document.querySelectorAll('.sticky')
		Stickyfill.add(audioContainers)
  }

  componentWillUnmount(){
	  this.audios = null
  }

  _pauseAllAudios(){
    this.setState({ pauseAll: true })
	}
  
  _resetPauseState(){
    this.setState({ pauseAll: false })
  }

  _audioInitiated(audio) {
    this.audios.push(audio)
  }

  render() {
    const {
     pauseAll
    } = this.state
    const {
      content,
    } = this.props

    return (
      <Container>
			{
				content.map((oneBox, audioIndex) => {
					const {
						subtitles,
						catchphrase,
						catchphraseFace,
						audioFile,
						durationBarColor,
            currentBarColor,
            storyteller,
            storytitle
					} = content[audioIndex]
					return (
						<AudioContainer
						  className="sticky"
							key={`audio-${audioIndex}`}
            >
              <LazyLoad once={true} offset={1500} height={'100%'}>
                <React.Fragment>
					     	  <AudioSectionBg
						        mobile={imgSrc[catchphraseFace.mobile]}
						        tablet={imgSrc[catchphraseFace.tablet]}
						        desktop={imgSrc[catchphraseFace.desktop]}
                  />
                  <TWAudio
						      	storyteller={storyteller}
						      	storytitle={storytitle}
						        file={audioSrc[audioFile]}
						        durationBarColor={durationBarColor}
						        currentBarColor={currentBarColor}
						        subtitles={subtitleSrc[subtitles]}
						        audioInitiated={this.audioInitiated}
						        catchphrase={catchphrase}
                    pauseAll={pauseAll}
                    pauseAllAudios={this.pauseAllAudios}
                    resetPauseState={this.resetPauseState}
                  />
                </React.Fragment>
              </LazyLoad>
						</AudioContainer>	  
					)
				})
			}
      </Container>
    )
  }
}

StoryBox.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      subtitles: PropTypes.string.isRequired,
      catchphrase: PropTypes.string.isRequired,
      catchphraseFace: PropTypes.object.isRequired,
      audioFile: PropTypes.string.isRequired,
      durationBarColor: PropTypes.string.isRequired,
      currentBarColor: PropTypes.string.isRequired,
      background: PropTypes.object,
    })).isRequired,
}

export default StoryBox
