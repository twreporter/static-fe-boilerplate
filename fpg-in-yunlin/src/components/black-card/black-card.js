// import * as styles from '../../constants/style-variables'
import { isCurrnetIndexNextToIndex } from '../../utils/is-near-current'
import anime from 'animejs'
import EnhancedTransition from '../enhanced-transition'
import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  map,
}

const Card = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: black;
  position: absolute;
`

const animation = {
  enterFromPrev: {
    opacity: {
      value: [0, 0.78],
      duration: 100,
      delay: 0,
      easing: 'linear',
    },
  },
  exitToNext: {
    opacity: {
      value: [0.78, 0],
      duration: 900,
      easing: 'linear',
    },
  },
}

class BlackCard extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
  }
  constructor(props) {
    super(props)
    this._card = null
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
      targets: this._card,
      autoplay: false,
    })
    this.enterFromPrevAnime = anime({
      ...animation.enterFromPrev,
      targets: this._card,
      autoplay: false,
    })
  }

  _getImageDomNode(ele) {
    this._card = ele
  }

  _calTimeout(animationObj) {
    const timeOfproterties = _.map(animationObj, prop => (prop.duration || 0) + (prop.delay || 0))
    return Math.max(...timeOfproterties)
  }

  render() {
    const {
      currentIndex,
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
          // if (this.onExitToNextAnime) {
          //   this.onExitToNextAnime.reverse()
          //   this.onExitToNextAnime.play()
          // }
        }}
        onExitToPrev={() => {
          if (this.onExitToNextAnime) {
            this.onExitToNextAnime.restart()
            this.onExitToNextAnime.play()
          }
          // if (this.enterFromPrevAnime) {
          //   this.enterFromPrevAnime.reverse()
          //   this.enterFromPrevAnime.play()
          // }
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
        <Card
          innerRef={this.getImageDomNode}
        />
      </EnhancedTransition>
    )
  }
}

export default BlackCard
