// import mq from '../../utils/media-query'
import { colors, fontWeight } from '../../constants/style'
import * as eventTypes from './event-types'
import DraggablePlayer from './draggable-player'
import interact from 'interactjs'
import playersData from '../../data/players'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import mq, { breakPoints } from '../../utils/media-query'
// lodash
import map from 'lodash/map'
import get from 'lodash/get'

const _ = {
  get,
  map,
}

const PlayerName = styled.div`
  margin-top: 6px;
  color: ${colors.playerName};
  font-size: 24px;
  font-weight: ${fontWeight.bold};
  text-align: center;
`

const Player = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const PlayerNation = styled.div`
  color: ${colors.playerNation};
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  text-align: center;
  line-height: 1.2;
`

const PrevButton = (width, height, strokeWidth) => {
  const left = strokeWidth
  const top = strokeWidth
  const right = strokeWidth + width
  const bottom = strokeWidth + height
  return (
    <svg width={right + strokeWidth} height={bottom + strokeWidth} >
      <polygon
        points={`${right},${top} ${left},${(top + bottom) / 2} ${right},${bottom}`}
        fill="#a2d4dd"
        stroke="#ffffff"
        strokeWidth="3"
      />
    </svg>
  )
}

const NextButton = (width, height, strokeWidth) => {
  const left = strokeWidth
  const top = strokeWidth
  const right = strokeWidth + width
  const bottom = strokeWidth + height
  return (
    <svg width={right + strokeWidth} height={bottom + strokeWidth} >
      <polygon
        points={`${left},${top} ${right},${(top + bottom) / 2} ${left},${bottom}`}
        fill="#a2d4dd"
        stroke="#ffffff"
        strokeWidth="3"
      />
    </svg>
  )
}

const Container = styled.div`
  display: flex;
  width: 80%;
  min-width: 320px;
  max-width: 680px;
  margin: 5px auto 0 auto;
  ${mq.desktopAbove`
    margin: 18px auto 0 auto;
  `}
  touch-action: manipulation;
  user-select: none;
`

const ButtonWrapper = styled.div`
  flex: 1 0 50px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  >svg>polygon {
    fill: #a2d4dd;
    stroke: #ffffff;
    stroke-width: 3;
    stroke-linejoin: round;
    box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.3);
    &:hover {
      box-shadow: 0 4px 3px 0 rgba(0, 0, 0, 0.3);
    }
  }
`

const Signs = styled.div`
  display: flex;
  justify-content: center;
  cursor: pointer;
  width: 95%;
  max-width: 500px;
  margin: 6px auto 0 auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  ${mq.desktopAbove`
    margin: 16px auto 24px auto;
  `}
`

const Sign = styled.div`
  flex: 0 1 40px;
  opacity: ${props => (props.on ? '1' : '.5')};
  margin: 0 5px;
  transition: opacity 200ms ease;
  >img {
    background-color: #f1f1f1;
    border-radius: 50%;
    width: 100%;
    height: auto;
  }
`

const PlayersInFocus = styled.div`
  display: flex;
  flex: 0 1 450px;
  justify-content: space-around;
`

export default class WaitingArea extends PureComponent {
  static propTypes = {
    waiting: PropTypes.array,
    updateRank: PropTypes.func.isRequired,
    focusStartAt: PropTypes.number.isRequired,
    setFocusStartAt: PropTypes.func.isRequired,
  }

  static defaultProps = {
    waiting: [],
  }

  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.state = {
        show: (window.innerWidth >= breakPoints.desktop.min) ? 3 : 1,
      }
    } else {
      this.state = {
        show: 1,
      }
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this._handleResize)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._handleResize)
    }
  }

  getEle = (ele) => {
    this._element = ele
    if (this._element) {
      interact(this._element)
        .dropzone({
          accept: '.player',
        })
        .on(eventTypes.droppable.drop, this._handleDrop)
    }
  }

  _handleResize = () => {
    this.setState(() => ({
      show: (window.innerWidth >= breakPoints.desktop.min) ? 3 : 1,
    }))
  }

  _handleDrop = (event) => {
    const { updateRank } = this.props
    const droppedPlayerId = _.get(event, 'relatedTarget.id')
    updateRank(droppedPlayerId)
  }

  _buildPlayerInFocus = (playerId) => {
    return (
      <Player key={playerId}>
        <DraggablePlayer
          id={playerId}
          image={_.get(playersData, [playerId, 'image'])}
        />
        <PlayerName>{_.get(playersData, [playerId, 'name'])}</PlayerName>
        <PlayerNation>{_.get(playersData, [playerId, 'nation'])}</PlayerNation>
      </Player>
    )
  }

  _selectPlayersInFocus() {
    const { focusStartAt, waiting } = this.props
    const { show } = this.state
    const sliced = waiting.slice(focusStartAt, focusStartAt + show)
    return sliced.concat(waiting.slice(0, show - sliced.length))
  }

  _checkIfPlayerInFocus(playerId) {
    return this._selectPlayersInFocus().some(player => player === playerId)
  }

  _buildPlayerSign = (playerId, index) => {
    const handleClick = () => {
      this.props.setFocusStartAt(index)
    }
    return (
      <Sign
        key={playerId}
        onClick={handleClick}
        on={this._checkIfPlayerInFocus(playerId)}
      >
        <img src={playersData[playerId].image} alt={playerId} />
      </Sign>
    )
  }

  increaseFocusStart = (e) => {
    e.preventDefault()
    const { focusStartAt, setFocusStartAt, waiting } = this.props
    const { show } = this.state
    const lastIndex = waiting.length - 1
    setFocusStartAt(focusStartAt >= lastIndex ? 0 : focusStartAt + show)
  }

  decreaseFocusStart = (e) => {
    e.preventDefault()
    const { focusStartAt, setFocusStartAt, waiting } = this.props
    const { show } = this.state
    const lastIndex = waiting.length - 1
    setFocusStartAt(focusStartAt <= 0 ? lastIndex : focusStartAt - show)
  }

  render() {
    const { waiting } = this.props
    const playersInFocus = this._selectPlayersInFocus()
    return (
      <div ref={this.getEle}>
        <Container>
          <ButtonWrapper onClick={this.decreaseFocusStart}>
            {PrevButton(20, 26, 3)}
          </ButtonWrapper>
          <PlayersInFocus>
            {_.map(playersInFocus, this._buildPlayerInFocus)}
          </PlayersInFocus>
          <ButtonWrapper onClick={this.increaseFocusStart}>
            {NextButton(20, 26, 3)}
          </ButtonWrapper>
        </Container>
        <Signs>{_.map(waiting, this._buildPlayerSign)}</Signs>
      </div>
    )
  }
}
