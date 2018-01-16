import anime from 'animejs'
import desktopImage from '../../../static/desktop-map.png'
import EnhancedTransition from '../enhanced-transition'
import getDeviceType from '../../utils/get-device-type'
import map from 'lodash.map'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import tabletImage from '../../../static/tablet-map.png'

const _ = {
  map,
}

const index = [11, 17]

const desktopAnimation = {
  enterFromPrev: {
    opacity: {
      value: [0, 1],
      duration: 600,
      delay: 600,
      easing: 'linear',
    },
    translateY: {
      value: ['-45%', '-50%'],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: {
      value: ['-70%', '-50%'],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    scale: {
      value: [0.58, 1],
      duration: 1000,
      delay: 200,
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

const mobileAnimation = {
  enterFromPrev: {
    opacity: desktopAnimation.enterFromPrev.opacity,
    translateY: {
      value: ['-13%', '-50%'],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: {
      value: '-50%',
      duration: 0,
      easing: 'linear',
    },
    scale: {
      value: [1.27, 1],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
  exitToNext: desktopAnimation.exitToNext,
}

const tabletAnimation = {
  enterFromPrev: {
    opacity: mobileAnimation.enterFromPrev.opacity,
    translateY: {
      value: ['-3%', '-50%'],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
    translateX: mobileAnimation.enterFromPrev.translateX,
    scale: {
      value: [1.78, 1],
      duration: 1000,
      delay: 200,
      easing: 'linear',
    },
  },
  exitToNext: desktopAnimation.exitToNext,
}

const bgAnimations = {
  desktop: desktopAnimation,
  tablet: tabletAnimation,
  mobile: mobileAnimation,
}

const Image = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  position: absolute;
  ${mq.tabletBelow`
    max-width: 500px;
    width: 90%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${tabletImage});
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
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(${desktopImage});
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
    const deviceType = getDeviceType()
    this._registerAname(deviceType)
  }

  _registerAname(deviceType) {
    const bgAnimation = bgAnimations[deviceType]
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
    const show = index[0] <= currentIndex && currentIndex <= index[1]
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
          enter: this._calTimeout(desktopAnimation.enterFromPrev),
          exit: this._calTimeout(desktopAnimation.exitToNext),
        }}
      >
        <Image
          show={show}
          innerRef={this.getImageDomNode}
        />
      </EnhancedTransition>
    )
  }
}

export default Background
