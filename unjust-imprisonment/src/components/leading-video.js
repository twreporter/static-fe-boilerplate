// import PlaySVG from '../../static/play-bt.svg'
import React from 'react'
import Video from './video'
import Waypoint from 'react-waypoint'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  cursor: pointer;
`

class LeadingVideo extends Video {
  componentWillReceiveProps(nextProps) {
    this.wasPlayingInThePreviousStage = nextProps.isAutoPlay
  }

  render() {
    const { content } = this.props
    return (
      <Waypoint
        onLeave={this.onLeave}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <Container>
          <video
            autoPlay
            muted
            controls
            onClick={this.toggleVideo}
            onEnded={this.onEnded}
            onLoadedData={this.onLoadedData}
            playsInline
            poster={content[0]}
            preload="auto"
            ref={(node) => { this.player = node }}
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
      </Waypoint>
    )
  }
}


export default LeadingVideo
