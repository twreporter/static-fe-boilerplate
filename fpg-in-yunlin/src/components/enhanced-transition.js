/* eslint react/require-default-props: 0 */
import PropTypes from 'prop-types'
import React from 'react'
import Transition from 'react-transition-group/Transition'

/*
  Preprocess props for Transition:
  1. Trigger transition `in` when props.index === props.currentIndex
  2. Seperate `onEnter` into `onEnterFromPrev` and `onEnterFromNext` according to stored previous currentIndex in state
  3. Seperate `onExit` into `onExitToPrev` and `onExitToNext`
  4. You can use original `onEnter` and `onExit` if there's no need to distinguish them
  5. Will pass all the other props to `Transition`
  ref. https://reactcommunity.org/react-transition-group/
*/
class EnhancedTransition extends React.PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
    index: PropTypes.oneOfType([PropTypes.number, PropTypes.array]).isRequired,
    currentIndex: PropTypes.number.isRequired,
    onExit: PropTypes.func,
    onExitToPrev: PropTypes.func,
    onExitToNext: PropTypes.func,
    onEnter: PropTypes.func,
    onEnterFromPrev: PropTypes.func,
    onEnterFromNext: PropTypes.func,
  }
  constructor(props) {
    super(props)
    this.state = {
      from: undefined,
    }
    this._onEnter = this._onEnter.bind(this)
    this._onExit = this._onExit.bind(this)
  }
  componentWillReceiveProps() {
    const from = this.props.currentIndex
    this.setState({
      from,
    })
  }
  _onEnter() {
    const { from } = this.state
    const { currentIndex } = this.props
    if (!from || currentIndex > from) {
      return this.props.onEnterFromPrev()
    }
    return this.props.onEnterFromNext()
  }
  _onExit() {
    const { from } = this.state
    const { currentIndex } = this.props
    if (currentIndex > from) {
      return this.props.onExitToNext()
    }
    return this.props.onExitToPrev()
  }
  render() {
    const {
      children,
      index,
      currentIndex,
      onEnter,
      onExit,
      onExitToPrev,
      onExitToNext,
      onEnterFromPrev,
      onEnterFromNext,
      ...elseProps
    } = this.props
    const isFocus = Array.isArray(index) ? (index[0] <= currentIndex && currentIndex <= index[1]) : (index === currentIndex)
    return (
      <Transition
        in={isFocus}
        onEnter={onEnter || this._onEnter}
        onExit={onExit || this._onExit}
        {...elseProps}
      >
        {children}
      </Transition>
    )
  }
}

export default EnhancedTransition
