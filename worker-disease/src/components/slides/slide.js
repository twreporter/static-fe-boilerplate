import * as animations from '../../constants/velocity-animations'
import PropTypes from 'prop-types'
import React from 'react'
import VelocityComponent from 'velocity-react/velocity-component'
import SlideContainer from './slide-container'
import map from 'lodash/map'
import styled from 'styled-components'
import { colors } from '../../constants/style-variables'

const BlackCard = styled.div`
  z-index: -5;
  width: 100%;
  height: 100%;
  background-color: ${colors.background};
  position: absolute;
  top: 0;
  left: 0;
`

const _ = {
  map,
}

class Slide extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocus: this._isFocus(props),
    }
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
      const animation = isFocus ? (enter || animations.defaultEnter) : (leave || animations.defaultLeave)
      return (
        <VelocityComponent
          key={i}
          {...animation}
          {...rest}
        >
          {jsx}
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
        {currentIndex === 0 ? <BlackCard /> : null}
      </SlideContainer>
    )
  }
}

Slide.propTypes = {
  containerType: PropTypes.string,
  contents: PropTypes.arrayOf(PropTypes.object),
  currentIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  displayOn: PropTypes.arrayOf(PropTypes.number),
}

Slide.defaultProps = {
  containerType: '',
  contents: [],
  displayOn: undefined,
}

export default Slide
