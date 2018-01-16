import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import EnhancedTransition from '../enhanced-transition'
import anime from 'animejs'
import map from 'lodash.map'
import mq from '../../utils/media-query'

const _ = {
  map,
}

const index = [2, 10]

const bgAnimation = {
  enterFromPrev: {
    opacity: {
      value: [0, 1],
      duration: 100,
      easing: 'linear',
    },
  },
  exitToNext: {
    opacity: {
      value: [1, 0],
      duration: 300,
      delay: 200,
      easing: 'linear',
    },
  },
}

const Black = styled.div`
  width: 100%;
  background-image: linear-gradient(to bottom, #000 0%, #000 25%, transparent 43%, transparent 100%);
  ${mq.desktopAbove`
    width: 340px;
    background-color: #000;
  `}
  height: 100%;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  ::after {
    content: "";
    dispolay: block;
    width: 1px;
    height: 100%;
    background-image: linear-gradient(to bottom, #000 0%, #F0F0F0 15%, #F0F0F0 100%);
    position: absolute;
    ${mq.mobileOnly`
      left: 18px;
    `}
    ${mq.tabletOnly`
      left: 44px;
    `}
    ${mq.desktopAbove`
      left: 29px;
    `}
    top: 0;
  }
`

class BlackBg extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number,
  }
  static defaultProps = {
    currentIndex: 0,
  }
  constructor(props) {
    super(props)
    this._black = null
    this.getImageDomNode = this._getImageDomNode.bind(this)
  }

  componentDidMount() {
    this._registerAname()
  }

  _registerAname() {
    this.onExitToNextAnime = anime({
      ...bgAnimation.exitToNext,
      targets: this._black,
      autoplay: false,
    })
    this.enterFromPrevAnime = anime({
      ...bgAnimation.enterFromPrev,
      targets: this._black,
      autoplay: false,
    })
  }

  _getImageDomNode(ele) {
    this._black = ele
  }

  _calTimeout(animationObj) {
    const timeOfproterties = _.map(animationObj, prop => (prop.duration || 0) + (prop.delay || 0))
    return Math.max(...timeOfproterties)
  }

  render() {
    const {
      currentIndex,
    } = this.props
    return (
      <EnhancedTransition
        currentIndex={currentIndex}
        index={index}
        onEnterFromPrev={() => {
          if (this.enterFromPrevAnime) {
            this.enterFromPrevAnime.restart()
            this.enterFromPrevAnime.play()
          }
        }}
        onEnterFromNext={() => {
          if (this.onExitToNextAnime) {
            this.onExitToNextAnime.reverse()
            this.onExitToNextAnime.play()
          }
        }}
        onExitToPrev={() => {
          if (this.enterFromPrevAnime) {
            this.enterFromPrevAnime.reverse()
            this.enterFromPrevAnime.play()
          }
        }}
        onExitToNext={() => {
          if (this.onExitToNextAnime) {
            this.onExitToNextAnime.restart()
            this.onExitToNextAnime.play()
          }
        }}
        timeout={{
          enter: this._calTimeout(bgAnimation.enterFromPrev),
          exit: this._calTimeout(bgAnimation.exitToNext),
        }}
      >
        <Black
          innerRef={this.getImageDomNode}
        />
      </EnhancedTransition>
    )
  }
}

export default BlackBg
