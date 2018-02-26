// import PlaySVG from '../../static/play-bt.svg'
import React from 'react'
import Video from './ie-video'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  cursor: pointer;
`

class LeadingVideo extends Video {
  render() {
    const { content } = this.props
    return (
      <Container>
        <video
          controls
          onLoadedData={this.onLoadedData}
          playsInline
          poster={content[0]}
          preload="auto"
          ref={(node) => { this.videoNode = node }}
          width="100%"
        >
          <source
            src={this._getFullSrc('leading-video.webm')}
            type="video/webm"
          />
          <source
            src={this._getFullSrc(content[2])}
            type="video/mp4"
          />
        </video>
      </Container>
    )
  }
}


export default LeadingVideo
