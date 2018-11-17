import { SubtitleContainer, TextFrame } from './common-components'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'

const _ = {
  get,
}

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
      <SubtitleContainer>
        {SubtitleFrames}
      </SubtitleContainer>
    )
  }
}


Subtitle.propTypes = {
  subtitles: PropTypes.array.isRequired,
  currentTime: PropTypes.number.isRequired,
}

export default Subtitle
