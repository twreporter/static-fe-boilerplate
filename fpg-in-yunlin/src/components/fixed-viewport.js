/* eslint no-restricted-globals: 0, react/no-did-mount-set-state: 0 */
import get from 'lodash.get'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { css } from 'styled-components'
import Swipeable from 'react-swipeable'
import throttle from 'lodash.throttle'

const _ = {
  get,
  throttle,
}

const reactRootSelector = '#root'

const globalCssForViewport = css`
  html, body {
    touch-action: manipulation;
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    position: relative;
  }

  html, body, ${reactRootSelector} {
    height: 100%;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0) !important; 
    -webkit-focus-ring-color: rgba(255, 255, 255, 0) !important; 
    outline: none !important;
  }
`

const wheelThreshold = 0
const onWheelThrottleWaitTime = 1600
const pageChangeThrottleWaitTime = 900

const Container = styled.div`
  user-select: none;
  box-sizing: border-box;
  background-color: ${props => props.backgroundColor};
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`

class ViewPort extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }

  componentDidMount() {
    /* Hit specific page with hash */
    const { hash } = _.get(window, 'location')
    if (hash) {
      const targetIndex = parseInt(hash.substring(1), 10)
      const { nOfIndex } = this.props
      if (targetIndex >= 0 && targetIndex < nOfIndex) {
        return this.setState({
          currentIndex: targetIndex,
        })
      }
    }
  }

  onKeyDown = (e) => {
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
        return this.changeIndex(this.state.currentIndex + 1)
      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
      case 'PageUp':
        e.preventDefault()
        return this.changeIndex(this.state.currentIndex - 1)
      default:
        return null
    }
  }

  /* Action of two fingers swiping on laptop touchpad may cause lots of wheeling events during about 1.6s. So we need to throttle it. */
  onWheel = _.throttle((e) => {
    if (Math.abs(e.deltaY) > wheelThreshold) {
      if (e.deltaY > 0) {
        return this.changeIndex(this.state.currentIndex + 1)
      }
      if (e.deltaY < 0) {
        return this.changeIndex(this.state.currentIndex - 1)
      }
    }
  }, onWheelThrottleWaitTime, { leading: true, trailing: false })

  _isIndexValueValid(index) {
    const { nOfIndex } = this.props
    return (index >= 0 && index < nOfIndex)
  }

  changeIndex = _.throttle((targetIndex) => {
    if (this._isIndexValueValid(targetIndex)) {
      if (targetIndex !== this.state.currentIndex) {
        this.setState({
          currentIndex: targetIndex,
        })
      }
    }
  }, pageChangeThrottleWaitTime, { leading: true, trailing: false })

  goToNextIndex = () => {
    return this.changeIndex(this.state.currentIndex + 1)
  }

  goToPrevIndex = () => {
    return this.changeIndex(this.state.currentIndex - 1)
  }

  _addPropsToChild = (child) => {
    return React.cloneElement(child, {
      currentIndex: this.state.currentIndex,
      goToNextIndex: this.goToNextIndex,
    })
  }

  render() {
    const { backgroundColor, children } = this.props
    return (
      <Container
        backgroundColor={backgroundColor}
        onKeyDown={this.onKeyDown}
        onWheel={this.onWheel}
      >
        <Swipeable
          tabIndex="0"
          style={{ height: '100%', position: 'relative' }}
          onSwipedDown={this.goToPrevIndex}
          onSwipedUp={this.goToNextIndex}
        >
          {React.Children.map(children, this._addPropsToChild)}
        </Swipeable>
      </Container>
    )
  }
}

ViewPort.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundColor: PropTypes.string,
  nOfIndex: PropTypes.number.isRequired,
}

ViewPort.defaultProps = {
  backgroundColor: '#1d1d1d',
}

export default ViewPort
export { globalCssForViewport }
