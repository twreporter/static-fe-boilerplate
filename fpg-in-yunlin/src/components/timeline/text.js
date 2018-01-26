import { color, fontSize, fontWeight } from '../../constants/style-variables'
import { isCurrnetIndexNextToIndex } from '../../utils/is-near-current'
import anime from 'animejs'
import EnhancedTransition from '../enhanced-transition'
import map from 'lodash.map'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import mq from '../../utils/media-query'

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
    translateY: {
      value: [400, 0],
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

const Container = styled.div`
  width: 100%;
  top: 9.2%;
  height: 90.8%;
  padding: 0 21px 0 33px;
  ${mq.tabletOnly`
    padding: 0 90px 0 69px;
  `}
  ${mq.desktopAbove`
    width: 340px;
    height: 80%;
    top: 20%;
    padding: 0 26px 0 54px;
  `}
  opacity: 0;
  position: absolute;
  right: 0;
`

const Year = styled.div`
  font-size: ${fontSize.timeline.year.mobile};
  ${mq.desktopAbove`
    font-size: ${fontSize.timeline.year.desktop};
  `}
  color: ${color.timeline.title};
  font-weight: ${fontWeight.bold};
  line-height: 1.4;
`

const Title = styled.h3`
  font-size: ${fontSize.timeline.title.mobile};
  ${mq.desktopAbove`
    font-size: ${fontSize.timeline.title.desktop};
  `}
  margin: 0 0 9px;
  color: ${color.timeline.title};
  font-weight: ${fontWeight.bold};
  line-height: 1.4;
`

const Description = styled.div`
  font-size: ${fontSize.timeline.description.mobile};
  ${mq.desktopAbove`
    font-size: ${fontSize.timeline.description.desktop};
  `}
  color: ${color.timeline.text};
  font-weight: ${fontWeight.light};
  line-height: 1.67;
  text-align: justify;
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
      title,
      year,
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
          if (this.props.currentIndex === 1) {
            if (this.onExitToNextAnime) {
              this.onExitToNextAnime.restart()
              this.onExitToNextAnime.play()
            }
          } else if (this.enterFromPrevAnime) {
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
        <Container
          innerRef={this.getImageDomNode}
        >
          <Year>{year}</Year>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Container>
      </EnhancedTransition>
    )
  }
}

export default Text
