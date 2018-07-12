import interact from 'interactjs'
import mq from '../../utils/media-query'
import Player from './draggable-player'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import * as evetnTypes from './event-types'
// lodash
import get from 'lodash/get'


const _ = {
  get,
}

const Container = styled.div`
  width: 81px;
  position: relative;
  margin: 4px 4px;
  ${mq.miniOnly`
    margin: 6px 8px;
  `}
  ${mq.desktopAbove`
    margin: 6px 16px;
  `}
  ${mq.mobileAbove`
    flex: 0 1 81px;
  `}
`

const Medal = styled.div`
  width: 100%;
  padding-top: 147%;
  background-size: cover;
  background-image: url(${props => props.image});
  background-position: center center;
  background-repeat: no-repeat;
  position: relative;
`

const PlayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Circle = styled.div`
  width: 86%;
  height: 59%;
  border-radius: 50%;
  background-color: ${props => (props.isHover ? 'rgba(255, 255, 255, .3)' : 'transparent')};
  transition: background-color 300ms ease;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
`

// const Number = styled.div`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   font-size: 50px;
//   z-index: -1;
//   user-select: none;
//   touch-action: none;
// `

export default class Rank extends PureComponent {
  static propTypes = {
    player: PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
    updateRank: PropTypes.func.isRequired,
  }

  static defaultProps = {
    player: null,
  }

  constructor(props) {
    super(props)
    this._element = null
    this.state = {
      isHover: false,
    }
  }

  getEle = (ele) => {
    this._element = ele
    if (this._element) {
      interact(this._element)
        .dropzone({
          accept: '.player',
        })
        .on(evetnTypes.droppable.dragenter, this._handleDragEnter)
        .on(evetnTypes.droppable.dragleave, this._handleDragLeave)
        .on(evetnTypes.droppable.drop, this._handleDrop)
    }
  }

  _handleDragEnter = () => {
    this.setState({
      isHover: true,
    })
  }

  _handleDragLeave = () => {
    this.setState({
      isHover: false,
    })
  }

  _handleDrop = (event) => {
    const { index, updateRank } = this.props
    const droppedPlayerId = _.get(event, 'relatedTarget.id')
    this.setState({
      isHover: false,
    }, () => updateRank(droppedPlayerId, index))
  }

  render() {
    const { isHover } = this.state
    const { player, index } = this.props
    const numberDisplayed = index + 1
    const playerJSX = !player ? null : (<Player inUsersRank id={player.id} image={player.image} />)
    return (
      <Container
        image={`static/medal/medal-${numberDisplayed}.png`}
        className="drop-zone"
        innerRef={this.getEle}
      >
        <Medal image={`static/medal/medal-${numberDisplayed}.png`}>
          <Circle isHover={isHover} />
        </Medal>
        <PlayerWrapper>
          {playerJSX}
        </PlayerWrapper>
      </Container>
    )
  }
}
