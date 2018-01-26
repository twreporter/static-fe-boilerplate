import { isCurrnetIndexNextToIndex } from '../../utils/is-near-current'
import anime from 'animejs'
import EnhancedTransition from '../enhanced-transition'
import getDeviceType from '../../utils/get-device-type'
import map from 'lodash.map'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  ${mq.desktopAbove`
    height: 852px;
    width: 1440px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  `}
  position: absolute;
  overflow: hidden;
`

const Image = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
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

class SatelliteBg extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
    animation: PropTypes.object.isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
    image: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props)
    this._image = null
    this.getImageDomNode = this._getImageDomNode.bind(this)
  }

  componentDidMount() {
    const deviceType = getDeviceType()
    this._registerAname(deviceType)
  }

  shouldComponentUpdate(nextProps) {
    const { currentIndex, index } = nextProps
    return isCurrnetIndexNextToIndex(currentIndex, index)
  }

  _registerAname(deviceType) {
    const animation = this.props.animation[deviceType] || this.props.animation
    this.onExitToNextAnime = anime({
      ...animation.exit,
      targets: this._image,
      autoplay: false,
    })
    this.enterFromPrevAnime = anime({
      ...animation.enter,
      targets: this._image,
      autoplay: false,
    })
  }

  _getImageDomNode(ele) {
    this._image = ele
  }

  _calTimeout(animationObj) {
    const timeOfproterties = _.map(animationObj, prop => (prop.duration || 0) + (prop.delay || 0))
    return Math.max(...timeOfproterties)
  }

  render() {
    const {
      currentIndex,
      animation,
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
          enter: this._calTimeout(animation.enter),
          exit: this._calTimeout(animation.exit),
        }}
      >
        <Wrapper>
          <Image
            innerRef={this.getImageDomNode}
            desktopImage={image.desktop.url}
            tabletImage={image.tablet.url}
          />
        </Wrapper>
      </EnhancedTransition>
    )
  }
}

export default SatelliteBg
