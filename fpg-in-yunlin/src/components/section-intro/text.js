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
      duration: 800,
      delay: 400,
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

const Container = styled.div`
  ${mq.tabletBelow`
    width: 80%;
    max-width: 478px;
  `}
  ${mq.desktopAbove`
    width: 520px;
  `}
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

const Title = styled.h3`
  margin: 0 auto 30px auto;
  color: ${color.intro.title};
  font-size: ${fontSize.intro.title.desktop};
  font-weight: ${fontWeight.bold};
  line-height: 1.4;
  text-align: center;
`

const Description = styled.div`
  color: ${color.intro.text};
  font-size: ${fontSize.intro.description.desktop};
  font-weight: ${fontWeight.light};
  line-height: 1.8;
  text-align: justify;
`

class Text extends React.Component {
  static propTypes = {
    currentIndex: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
    title: PropTypes.string.isRequired,
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
          if (this.onExitToNextAnime) {
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
        <Container
          innerRef={this.getImageDomNode}
        >

          <Title>{title}</Title>
          <Description dangerouslySetInnerHTML={{ __html: description }} />
        </Container>
      </EnhancedTransition>
    )
  }
}

export default Text
