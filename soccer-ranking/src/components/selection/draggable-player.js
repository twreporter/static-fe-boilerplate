import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'
import interact from 'interactjs'
import { colors, fontWeight } from '../../constants/style'
import * as eventTypes from './event-types'
import { breakPoints } from '../../utils/media-query'
import playersData from '../../data/players'

// get
import get from 'lodash/get'

const _ = {
  get,
}

const droppedEffect = keyframes`
  from {
    opacity: .5;
  }
  to {
    opacity: 1;
  }
`

const nameCaption = css`
  &::after {
    content: "${props => props.name}";
    position: absolute;
    opacity: .9;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 0;
    white-space: nowrap;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
    font-size: 16px;
    font-weight: ${fontWeight.bold};
  }
`

const Container = styled.div.attrs({
  style: ({ translateX, translateY, isHeld }) => {
    return ({
      transform: `translate(${translateX}px, ${translateY}px)`,
      transition: isHeld ? '' : 'transform 500ms ease',
      zIndex: isHeld ? 50 : 10,
    })
  },
})`
  position: relative;
  user-select: none;
  touch-action: none;
  cursor: ${props => (props.isHeld ? 'grabbing' : 'grab')};
  width: 124px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;
  ${props => (props.isHeld && props.inUsersRank ? nameCaption : '')}
  ${props => (props.inUsersRank ? css`
    width: 82.5%;
    animation: ${droppedEffect} 260ms ease both;
    top: 12.5%;
    margin: 0 auto;
  ` : '')}
`

const Image = styled.div`
  border: 3px solid ${colors.playerBorder}; 
  background-position: center center;
  background-image: url(${props => props.image});
  background-size: cover;
  background-color: ${colors.playerBg};
  border-radius: 50%;
  width: 100%;
  padding-top: calc(100% - 6px);
`

export default class Player extends PureComponent {
  static propTypes = {
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    inUsersRank: PropTypes.bool,
  }

  static defaultProps = {
    inUsersRank: false,
  }

  constructor(props) {
    super(props)
    this._element = null
    this.state = {
      translateX: 0,
      translateY: 0,
      isHeld: false,
    }
    this._startX = 0
    this._startY = 0
  }

  _getEle = (ele) => {
    this._element = ele
    if (this._element) {
      interact(this._element)
        .draggable({
          autoScroll: _.get(document, 'documentElement.clientWidth', 0) < breakPoints.mobile.min,
        })
        .on(eventTypes.draggable.dragstart, this._handleDragStart)
        .on(eventTypes.draggable.dragmove, this._handleDragMove)
        .on(eventTypes.draggable.dragend, this._handleDragEnd)
        .on(eventTypes.pointer.down, this._heldStart)
        .on(eventTypes.pointer.up, this._heldEnd)
        .on(eventTypes.pointer.cancel, this._heldEnd)
    }
  }

  _handleDragStart = () => {
    // save start X,Y for resetting the position when it is not dropped in rank
    const { translateX, translateY } = this.state
    this._startX = translateX
    this._startY = translateY
  }

  _handleDragMove = (event) => {
    const { dx, dy } = event
    this.setState(({ translateX, translateY }) => ({
      translateX: (translateX || 0) + dx,
      translateY: (translateY || 0) + dy,
    }))
  }

  /*
    The draggable-element will return to original position when it is dropped anywhere.
    But if it is dropped into the given drop-zone, it will trigger the onDrop event.
    The event handler will unmount the draggable-element and create a new element in the drop-zone at the same time.
    On the user's perspective, it will look like there is only one element that was dragged and dropped into the drop-zone.
  */
  _handleDragEnd = () => {
    this.setState({
      translateX: this._startX,
      translateY: this._startY,
    })
  }

  _heldStart = () => {
    this.setState({
      isHeld: true,
    })
  }

  _heldEnd = () => {
    this.setState({
      isHeld: false,
    })
  }

  render() {
    const { id, image, inUsersRank } = this.props
    const { isHeld, translateX, translateY } = this.state
    const { name } = playersData[id]
    return (
      <Container
        id={id}
        className="player"
        innerRef={this._getEle}
        translateX={translateX}
        translateY={translateY}
        isHeld={isHeld}
        inUsersRank={inUsersRank}
        name={name}
      >
        <Image image={image} className={`animated ${isHeld ? 'tada' : ''}`} />
      </Container>
    )
  }
}
