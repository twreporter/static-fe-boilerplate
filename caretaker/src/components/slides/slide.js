import { colors } from '../../constants/style-variables'
import { gtag } from '../../constants/metadata'
import * as animations from '../../constants/velocity-animations'
import Background from '../background'
import map from 'lodash/map'
import padStart from 'lodash/padStart'
import PropTypes from 'prop-types'
import React from 'react'
import SlideContainer from './slide-container'
import styled from 'styled-components'
import VelocityComponent from 'velocity-react/velocity-component'

const _ = {
  map,
  padStart,
}

const BlackCard = styled.div`
  z-index: -5;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
  position: absolute;
  top: 0;
  left: 0;
`

class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocus: this._isFocus(props),
    }
    this._startTimestamp = undefined
    if (!Date.now) {
      Date.now = () => new Date().getTime()
    }
  }

  componentDidMount() {
    const { isFocus } = this.state
    const { index } = this.props
    this._submitScreenViewEventIfNeeded(isFocus)
    if (index === 0) this._startTimestamp = Date.now()
  }

  componentWillReceiveProps(nextProps) {
    const prevPage = this.props.currentIndex
    const nextPage = nextProps.currentIndex
    if (prevPage !== nextPage) {
      this.setState({
        isFocus: this._isFocus(nextProps),
      })
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const { id } = this.props
    if (id !== 'slide') return
    const thisFocus = this.state.isFocus
    const nextFocus = nextState.isFocus
    const viewTime = this._calculateSlideViewTime(thisFocus, nextFocus)
    this._submitViewTimeEventIfNeeded(viewTime)
    this._submitScreenViewEventIfNeeded(nextFocus)
  }

  _submitScreenViewEventIfNeeded(isFocus) {
    const { index } = this.props
    if (isFocus) {
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'infographics_tracking', {
          event_category: gtag.eventCategory,
          event_action: 'view',
          screen_name: `section-${_.padStart(index, 2, '0')}`,
          event_label: `section-${_.padStart(index, 2, '0')}`,
        })
      }
    }
  }

  _submitViewTimeEventIfNeeded(viewTime) {
    const { index } = this.props
    if (viewTime > 0) {
      if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
        window.gtag('event', 'timing_complete', {
          value: viewTime,
          event_category: gtag.pageEventCategory,
          name: 'view',
          event_label: `section-${_.padStart(index, 2, '0')}`,
        })
      }
    }
  }

  _calculateSlideViewTime(thisFocus, nextFocus) {
    /* record time when entering */
    if (!thisFocus && nextFocus) {
      this._startTimestamp = Date.now()
      return
    }
    /* reset timestamp and return diff when leaving */
    if (thisFocus && !nextFocus) {
      const viewTime = Date.now() - this._startTimestamp
      this._startTimestamp = undefined
      return viewTime
    }
  }

  _isFocus(props) {
    const { currentIndex, displayOn, index } = props
    const isFocus = !displayOn ? (currentIndex === index) : (currentIndex >= displayOn[0] && currentIndex <= displayOn[1])
    return isFocus
  }
  _buildContentsJSX(contents) {
    const { isFocus } = this.state
    return _.map(contents, (content, i) => {
      const {
        enter,
        leave,
        jsx,
        ...rest
      } = content
      const chlid = React.cloneElement(jsx, { isFocus })
      const animation = isFocus ? (enter || animations.defaultEnter) : (leave || animations.defaultLeave)
      return (
        <VelocityComponent
          key={i}
          {...animation}
          {...rest}
        >
          {chlid}
        </VelocityComponent>
      )
    })
  }
  render() {
    const {
      currentIndex,
      contents,
      containerType,
      displayOn,
    } = this.props
    const { isFocus } = this.state
    const isBg = typeof displayOn !== 'undefined'
    return (
      <SlideContainer type={containerType} isFocus={isFocus} isBg={isBg}>
        {this._buildContentsJSX(contents)}
        {currentIndex === 0 ? <BlackCard><Background /></BlackCard> : null}
      </SlideContainer>
    )
  }
}

Slide.propTypes = {
  containerType: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.object),
  currentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.oneOf(['slide', 'bg']).isRequired,
  displayOn: PropTypes.arrayOf(PropTypes.number),
}

Slide.defaultProps = {
  containerType: '',
  contents: [],
  displayOn: undefined,
}

export default Slide
