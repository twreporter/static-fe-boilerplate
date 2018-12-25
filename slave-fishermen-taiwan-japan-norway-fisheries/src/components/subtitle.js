import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import screen from '../utils/screen'
import styled from 'styled-components'

const _ = {
  get,
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

export const TextFrame = styled.p`
  font-family: "source-han-sans-traditional", "Noto Sans TC", "PingFang TC", "Apple LiGothic Medium", "Roboto", "Microsoft JhengHei", "Lucida Grande", "Lucida Sans Unicode", sans-serif;
  opacity: ${props => (props.ifShowUp ? '1' : '0')};
  transition: all 800ms ease-in-out;
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  letter-spacing: 1.4px;
  text-align: left;
  margin: 0;
  mark {
    background-color: #e2e2e2;
    color: #0d1319;
    line-height: 2.5;
    padding: 0 6px;
  }
  ${screen.hdAbove`
    font-size: 24px;
  `}
  ${screen.desktopAbove`
    white-space: nowrap;
  `}
  ${screen.desktopOnly`
    font-size: 20px;
  `}
  ${screen.tabletOnly`
    font-size: 20px;
  `}
  ${screen.mobileBelow`
    font-size: 18px;
  `}
`

class Subtitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentFrameIndex: -1,
      ifShowUp: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { subtitles, currentTime } = nextProps
    const { currentFrameIndex, ifShowUp } = this.state
    const nextFrameIndex = currentFrameIndex < subtitles.length - 1 ? currentFrameIndex + 1 : currentFrameIndex
    if (!ifShowUp) {
      if (currentTime >= subtitles[nextFrameIndex].start && currentTime <= subtitles[nextFrameIndex].end) {
        this.setState({
          currentFrameIndex: nextFrameIndex,
          ifShowUp: true,
        })
        return
      }
    }
    if (currentFrameIndex >= 0) {
      if (currentTime > subtitles[currentFrameIndex].end) {
        this.setState({
          ifShowUp: false,
        })
      }
      if (currentTime > subtitles[currentFrameIndex].end && currentFrameIndex === subtitles.length - 1) {
        this.setState({
          ifShowUp: false,
          currentFrameIndex: -1,
        })
      }
    }
    // if (currentTime > subtitles[currentFrameIndex].end) {
    //   if (currentFrameIndex < subtitles.length - 1) {
    //     this.setState({
    //       currentFrameIndex: currentFrameIndex + 1,
    //       ifShowUp: false,
    //     })
    //   } else {
    //     this.setState({
    //       currentFrameIndex: -1,
    //       ifShowUp: false,
    //     })
    //   }
    // }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.currentFrameIndex !== nextState.currentFrameIndex || this.state.ifShowUp !== nextState.ifShowUp || false
  }

  render() {
    const { subtitles } = this.props
    const { currentFrameIndex, ifShowUp } = this.state
    const SubtitleFrames = (() => {
      return subtitles.map((s, i) => {
        const text = _.get(s, 'text', '')
        return (
          <TextFrame
            key={i}
            ifShowUp={i === currentFrameIndex && ifShowUp}
          >
            <mark>{text}</mark>
          </TextFrame>
        )
      })
    })()
    return (
      <Container>
        {SubtitleFrames}
      </Container>
    )
  }
}


Subtitle.propTypes = {
  subtitles: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
}

export default Subtitle
