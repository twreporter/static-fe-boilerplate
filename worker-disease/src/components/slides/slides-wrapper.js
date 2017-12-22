/* global history */
/* eslint no-restricted-globals: 0 */
import * as styles from '../../constants/style-variables'
import assign from 'lodash.assign'
import get from 'lodash.get'
import map from 'lodash.map'
import NextPageBtn from './next-page-btn'
import partition from 'lodash.partition'
import ProgressBar from './progress-bar'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import set from 'lodash.set'
import Slide from './slide'
import styled from 'styled-components'
import Swipeable from 'react-swipeable'
import throttle from 'lodash.throttle'

const _ = {
  assign,
  get,
  map,
  partition,
  set,
  throttle,
}

const wheelThreshold = 0

const Container = styled.div`
  background-color: ${props => props.backgroundColor};
  width: ${styles.pageWidth};
  height: ${styles.pageHeight};
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`

const ProgressBarConatiner = styled.div`
  position: absolute;
  z-index: ${styles.zIndex.progressBar};
  width: 100%;
  height: 5px;
`

class Slides extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }

    const { slides } = this.props
    const splited = _.partition(slides, object => !object.displayOn)
    this._slides = splited[0]
    this._bg = splited[1]

    this.onKeyDown = this.onKeyDown.bind(this)
    /* Action of two fingers swiping on laptop touchpad may cause lots of wheeling events during about 1.6s. So we need to throttle it. */
    this.onWheel = _.throttle(this.onWheel, 1600, { leading: true, trailing: false }).bind(this)

    this.goNextIndex = this.goNextIndex.bind(this)
    this.goPrevIndex = this.goPrevIndex.bind(this)
    this._changeIndex = _.throttle(this._changeIndex, 500, { leading: true, trailing: false })
  }

  componentWillMount() {
    if (typeof window !== 'undefined' && window.location) {
      const { hash } = window.location
      const targetIndex = parseInt(hash.substring(1), 10)
      const n = _.get(this._slides, 'length')
      if (targetIndex >= 0 && targetIndex < n) {
        return this.setState({
          currentIndex: targetIndex,
        })
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { currentIndex } = nextState
    if (typeof document !== 'undefined') {
      const feedback = document.getElementById('_hj_feedback_container')
      if (feedback) {
        const feedbackClasses = feedback.classList
        if (feedbackClasses) {
          if (currentIndex === _.get(this._slides, 'length') - 1) {
            feedbackClasses.add('show')
          } else if (feedback.style.opacity !== 0) {
            feedbackClasses.remove('show')
          }
        }
      }
    }
  }

  onKeyDown(e) {
    switch (e.key) {
      case 'PageDown':
      case 'Down':
      case 'Enter':
      case ' ':
      case 'ArrowRight':
      case 'Right':
      case 'ArrowDown':
      case 'Spacebar':
        e.preventDefault()
        return this._changeIndex(this.state.currentIndex + 1)
      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
      case 'PageUp':
        e.preventDefault()
        return this._changeIndex(this.state.currentIndex - 1)
      default:
        return null
    }
  }

  onWheel(e) {
    if (Math.abs(e.deltaY) > wheelThreshold) {
      if (e.deltaY > 0) {
        return this._changeIndex(this.state.currentIndex + 1)
      }
      if (e.deltaY < 0) {
        return this._changeIndex(this.state.currentIndex - 1)
      }
    }
  }

  _isIndexValueValid(index) {
    return (index >= 0 && index < _.get(this._slides, 'length'))
  }

  _changeIndex(targetIndex) {
    if (this._isIndexValueValid(targetIndex)) {
      if (targetIndex !== this.state.currentIndex) {
        this.setState({
          currentIndex: targetIndex,
        })
      }
    }
  }

  goNextIndex() {
    return this._changeIndex(this.state.currentIndex + 1)
  }

  goPrevIndex() {
    return this._changeIndex(this.state.currentIndex - 1)
  }

  _buildSlidesJSX(slides, id = 'slide') {
    const { currentIndex } = this.state
    return _.map(slides, (slide, index) => {
      return (
        <Slide
          key={`${id}-${index}`}
          currentIndex={currentIndex}
          id={id}
          index={index}
          {...slide}
        />
      )
    })
  }

  render() {
    const { backgroundColor } = this.props
    const { currentIndex } = this.state
    return (
      <Container
        backgroundColor={backgroundColor}
        onKeyDown={this.onKeyDown}
        onWheel={this.onWheel}
      >
        <Swipeable
          tabIndex="0"
          style={{ height: '100%', position: 'relative' }}
          onSwipedDown={this.goPrevIndex}
          onSwipedUp={this.goNextIndex}
        >
          <ProgressBarConatiner>
            <ProgressBar
              containerBg={styles.colors.pinkishGrey}
              indicatorBg={styles.colors.dullOrange}
              percent={(currentIndex / (_.get(this._slides, 'length') - 1)) * 100}
            />
          </ProgressBarConatiner>
          {this._buildSlidesJSX(this._slides, 'slide')}
          {this._buildSlidesJSX(this._bg, 'bg')}
          {currentIndex === 0 ? <NextPageBtn handleClick={this.goNextIndex} /> : null}
        </Swipeable>
      </Container>
    )
  }
}

Slides.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.object),
  backgroundColor: PropTypes.string,
}

Slides.defaultProps = {
  slides: [],
  backgroundColor: '#1d1d1d',
}

export default Slides
