import AudipPlayer from './audio-player'
import Collapse from './collapse'
import LetterBlock from './letter-block'
import PropTypes from 'prop-types'
import React from 'react'
// import styled from 'styled-components'
import Waypoint from 'react-waypoint'
import Container from '../content-container'
import mq from '../../utils/media-query'

const ContentContainer = Container.extend`
  background: #fff;
  ${mq.tabletAbove`
    padding-left: 47px;
    padding-right: 70px;
  `}
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
`

class AudioSection extends React.PureComponent {
  static propTypes = {
    content: PropTypes.object.isRequired,
    playing: PropTypes.string,
    setPlaying: PropTypes.func.isRequired,
  }
  static defaultProps = {
    playing: null,
  }
  constructor(props) {
    super(props)
    this.state = {
      enterInlinePlayer: false,
      expand: false,
    }
  }
  togglePlaying = () => {
    const { content, playing, setPlaying } = this.props
    const { id } = content
    const isPlaying = playing === id
    if (!this.state.expand) {
      this.setState({
        expand: true,
      })
    }
    return setPlaying(isPlaying ? null : id)
  }

  handleEnterInlinePlayer = () => {
    this.setState({
      enterInlinePlayer: true,
    })
  }

  handleLeaveInlinePlayer = () => {
    this.setState({
      enterInlinePlayer: false,
    })
  }

  // handleLeaveSection = () => {
  //   const { setPlaying } = this.props
  //   setPlaying(null)
  // }
  // <Waypoint
  //   scrollableAncestor="window"
  //   onLeave={this.handleLeaveSection}
  // >
  // </Waypoint>

  render() {
    const { content, playing } = this.props
    const { enterInlinePlayer } = this.state
    const { id, letter, audioSrc, lang, translator, title } = content
    const { chinese, origin } = letter
    const isPlaying = playing === id
    const showPopup = isPlaying && !enterInlinePlayer
    return (
      <div style={{ background: '#fff', padding: '36px 0' }}>
        <ContentContainer wide>
          <Waypoint
            scrollableAncestor="window"
            onEnter={this.handleEnterInlinePlayer}
            onLeave={this.handleLeaveInlinePlayer}
          >
            <div>
              <AudipPlayer
                audioSrc={audioSrc}
                isPlaying={isPlaying}
                togglePlaying={this.togglePlaying}
                title={title}
                lang={lang}
                showPopup={showPopup}
              />
            </div>
          </Waypoint>
          <Collapse show={this.state.expand}>
            <LetterBlock
              translator={translator}
              chinese={chinese}
              origin={origin}
              lang={lang}
            />
          </Collapse>
        </ContentContainer>
      </div>
    )
  }
}

export default AudioSection
