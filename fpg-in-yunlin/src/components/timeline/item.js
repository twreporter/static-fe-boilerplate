import { zIndex } from '../../constants/style-variables'
import { isCurrnetIndexNextToIndex } from '../../utils/is-near-current'
import anime from 'animejs'
import EnhancedTransition from '../enhanced-transition'
import map from 'lodash.map'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import itemData from '../../data/timeline-items'

const { index, image } = itemData[0]

const _ = {
  map,
}

const animation = {
  enterFromPrev: {
    opacity: {
      value: [0, 1],
      duration: 600,
      delay: 1000,
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

const Image = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: ${zIndex.timelineItem};
  ${mq.mobileOnly`
    background-image: url(${props => props.tabletImage});
    background-size: auto 87%;
    background-position: center bottom;
    background-repeat: no-repeat;
  `}
  ${mq.tabletOnly`
    background-image: url(${props => props.tabletImage});
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  `}
  ${mq.desktopAbove`
    background-image: url(${props => props.desktopImage});
    background-size: auto auto;
    background-position: center center;
    background-repeat: no-repeat;
  `}
`

class TimelineItem extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
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
    const { currentIndex } = nextProps
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
          // if (this.onExitToNextAnime) {
            // this.onExitToNextAnime.reverse()
            // this.onExitToNextAnime.play()
            this.enterFromPrevAnime.restart()
            this.enterFromPrevAnime.play()
          }
        }}
        onExitToPrev={() => {
          if (this.onExitToNextAnime) {
          // if (this.enterFromPrevAnime) {
            // this.enterFromPrevAnime.reverse()
            // this.enterFromPrevAnime.play()
            this.onExitToNextAnime.restart()
            this.onExitToNextAnime.play()
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
        <Image
          innerRef={this.getImageDomNode}
          tabletImage={image.tablet.url}
          desktopImage={image.desktop.url}
        />
      </EnhancedTransition>
    )
  }
}

export default TimelineItem
