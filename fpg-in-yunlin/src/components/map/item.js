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

const bgAnimation = {
  enterFromPrev: {
    opacity: {
      value: [0, 1],
      delay: 460,
      duration: 400,
      easing: 'linear',
    },
  },
  exitToNext: {
    opacity: {
      value: [1, 0],
      duration: 500,
      easing: 'linear',
    },
  },
}

const Image = styled.div`
  opacity: 0;
  position: absolute;
  ${mq.tabletBelow`
    max-width: 500px;
    width: 90%;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-image: url(${props => props.tabletImage});
    background-size: contain;
    background-position: center 20%;
    background-repeat: no-repeat;
  `}
  ${mq.mobileOnly`
    background-position: center 13%;
  `}
  ${mq.desktopAbove`
    width: 100%;
    height: 95%;
    max-height: 800px;
    top: 50%;
    transform: translateY(-50%);
    background-image: url(${props => props.desktopImage});
    background-size: contain;
    background-position: right 49% center;
    background-repeat: no-repeat;
  `}
`

class Background extends React.Component {
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
      image,
      index,
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
          if (this.enterFromPrevAnime) {
            this.enterFromPrevAnime.restart()
            this.enterFromPrevAnime.play()
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
        <Image
          innerRef={this.getImageDomNode}
          desktopImage={image.desktop.url}
          tabletImage={image.tablet.url}
        />
      </EnhancedTransition>
    )
  }
}

export default Background
