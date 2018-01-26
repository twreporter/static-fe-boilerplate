import { color, fontSize, fontWeight } from '../../constants/style-variables'
import { isCurrnetIndexNextToIndex } from '../../utils/is-near-current'
import anime from 'animejs'
import EnhancedTransition from '../enhanced-transition'
import map from 'lodash.map'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const animation = {
  enterFromPrev: {
    opacity: {
      value: [0, 1],
      duration: 600,
      delay: 200,
      easing: 'linear',
    },
  },
  exitToNext: {
    opacity: {
      value: [1, 0],
      duration: 200,
      delay: 100,
      easing: 'linear',
    },
  },
}

const Description = styled.div`
  width: 80%;
  max-width: 536px;
  font-size: ${fontSize.map.description.mobile};
  line-height: 1.62;
  top: 67%;
  white-space: pre-wrap;
  ${mq.tabletBelow`
    left: 50%;
    transform: translateX(-50%);
  `}
  ${mq.tabletOnly`
    font-size: ${fontSize.map.description.desktop};
    line-height: 1.67;
  `}
  ${mq.desktopAbove`
    font-size: ${fontSize.map.description.desktop};
    line-height: 1.67;
    top: 72%;
    right: 10%;
    width: 330px;
  `}
  ${mq.hdAbove`
    right: 15%;
  `}
  color: ${color.map.text};
  font-weight: ${fontWeight.light};
  text-align: justify;
  position: absolute;
  opacity: 0;
`

class Text extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
  }
  constructor(props) {
    super(props)
    this._text = null
    this.getImageDomNode = this._getImageDomNode.bind(this)
  }

  componentDidMount() {
    this._registerAname()
  }

  shouldComponentUpdate(nextProps) {
    const { currentIndex, index } = nextProps
    return isCurrnetIndexNextToIndex(currentIndex, index)
  }

  _registerAname() {
    this.onExitToNextAnime = anime({
      ...animation.exitToNext,
      targets: this._text,
      autoplay: false,
    })
    this.enterFromPrevAnime = anime({
      ...animation.enterFromPrev,
      targets: this._text,
      autoplay: false,
    })
  }

  _getImageDomNode(ele) {
    this._text = ele
  }

  _calTimeout(animationObj) {
    const timeOfproterties = _.map(animationObj, prop => (prop.duration || 0) + (prop.delay || 0))
    return Math.max(...timeOfproterties)
  }

  render() {
    const {
      currentIndex,
      description,
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
          enter: this._calTimeout(animation.enterFromPrev),
          exit: this._calTimeout(animation.exitToNext),
        }}
      >
        <Description innerRef={this.getImageDomNode}>{description}</Description>
      </EnhancedTransition>
    )
  }
}

export default Text
