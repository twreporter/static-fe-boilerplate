import Audio from 'react-howler'
import React from 'react'
import styled from 'styled-components'
import InlineControl from './inline-control'
import PopupControl from './popup-control'
import ContentContainer from './content-width'
import raf from 'raf'

const backgroundColor = '#fff'

const Container = styled.div`
  background-color: ${backgroundColor};
`

class AudioPlayer extends React.PureComponent {
  constructor(props) {
    super(props)
    this._audio = null
    this.state = {
      duration: 0,
      current: 0,
    }
  }
  onPlay = () => {
    this._raf = raf(this.getCurrentOnRaf)
  }
  onLoad = () => {
    if (this._audio) {
      this.setState({
        duration: this._audio.duration(),
      })
    }
  }
  onPause = () => {
    this.clearRaf()
  }
  onEnd = () => {
    this.props.togglePlaying()
    this.clearRaf()
  }
  getCurrentOnRaf = () => {
    if (this._audio) {
      this.setState({
        current: this._audio.seek(),
      })
    }
    raf(this.getCurrentOnRaf)
  }
  clearRaf = () => {
    if (this._raf) {
      raf.cancel(this._raf)
      this._raf = null
    }
  }
  render() {
    const {
      current,
      duration,
    } = this.state
    const {
      audioSrc,
      lang,
      isPlaying,
      title,
      togglePlaying,
      showPopup,
    } = this.props
    const controlProps = {
      lang,
      isPlaying,
      togglePlaying,
      title,
      current,
      duration,
    }
    return (
      <Container>
        <ContentContainer>
          <Audio
            ref={(ele) => { this._audio = ele }}
            src={audioSrc}
            playing={isPlaying}
            onLoad={this.onLoad}
            onPlay={this.onPlay}
            onEnd={this.onEnd}
            onPause={this.onPause}
            loop={false}
          />
          <InlineControl
            {...controlProps}
          />
          <PopupControl
            show={showPopup}
            {...controlProps}
          />
        </ContentContainer>
      </Container>
    )
  }
}

export default AudioPlayer
