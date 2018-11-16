import { fadeIn } from '../utils/animations'
import audioSrc from '../data/audio-src'
import imgSrc from '../data/img-src'
import PropTypes from 'prop-types'
import React from 'react'
import screen from '../utils/screen'
import styled from 'styled-components'
import subtitleSrc from '../data/subtitles/subtitle-src'
import TWAudio from './audio'

const Container = styled.div`
  width: 100%;
  background: ${props => props.background};
`

const AudioSectionBg = styled.div `
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  background-image: url(${props => props.mobile});
  animation: ${fadeIn} 900ms ease 1200ms both;
  ${screen.tabletOnly`
    background-image: url(${props => props.tablet});
  `}
  ${screen.desktopOnly`
    left: 39px;
  `};
  ${screen.desktopAbove`
    background-image: url(${props => props.desktop});
    left: 55px;
  `}
`

const AudioContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  max-height: 900px;
  ${screen.desktopAbove`
    max-height: 768px;
  `};
  ${screen.tabletOnly`
    max-height: 1024px;
  `};
`

class AudioBox extends React.PureComponent {
  render() {
    const {
      content,
      audioInitiated,
    } = this.props
    const {
      subtitles,
      catchphrase,
      catchphraseFace,
      audioFile,
      durationBarColor,
      currentBarColor,
      background
    } = content[0]

    return (
      <Container
        background={background}
      >
        <AudioContainer>
          <AudioSectionBg
            mobile={imgSrc[catchphraseFace.mobile]}
            tablet={imgSrc[catchphraseFace.tablet]}
            desktop={imgSrc[catchphraseFace.desktop]}
          />
          <TWAudio
            file={audioSrc[audioFile]}
            durationBarColor={durationBarColor}
            currentBarColor={currentBarColor}
            subtitles={subtitleSrc[subtitles]}
            audioInitiated={audioInitiated}
            catchphrase={catchphrase}
          />
        </AudioContainer>
      </Container>
    )
  }
}

AudioBox.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      subtitles: PropTypes.string.isRequired,
      catchphrase: PropTypes.string.isRequired,
      catchphraseFace: PropTypes.object.isRequired,
      audioFile: PropTypes.string.isRequired,
      durationBarColor: PropTypes.string.isRequired,
      currentBarColor: PropTypes.string.isRequired,
      background: PropTypes.object,
    })
    ).isRequired,
  audioInitiated: PropTypes.func.isRequired,
}

export default AudioBox
