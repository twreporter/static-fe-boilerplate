/* eslint react/no-unused-state: 0 */

import Anchors from './anchors'
import get from 'lodash.get'
import PropTypes from 'prop-types'
import React from 'react'
import smoothScroll from 'smoothscroll'
import Transition from 'react-transition-group/Transition'
import Waypoint from 'react-waypoint'
import shallowCompare from 'react-addons-shallow-compare'

const _ = {
  get,
}

class SideBar extends React.Component {
  constructor(props) {
    super(props)
    // moduleID to Module
    this._moduleMap = {}
    this.state = {
      currentSection: '',
      isScrolling: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.isScrolling) return false
    return shallowCompare(this, nextProps, nextState)
  }

  componentWillUnmount() {
    this._moduleMap = {}
  }

  _scrollTo = (moduleID) => {
    const node = this._moduleMap[moduleID]
    const scrollToNode = () => smoothScroll(node, 500, () => this.setState({ isScrolling: false }))
    if (node) {
      this.setState({
        isScrolling: true,
      }, scrollToNode)
    }
    return null
  }

  _handleClickAnchor = (moduleID) => {
    const { setPlaying } = this.props
    if (typeof setPlaying === 'function') {
      setPlaying(null, () => this._scrollTo(moduleID))
    }
  }

  _setCurrentSection = (moduleID) => {
    this.setState({
      currentSection: moduleID,
    })
  }

  _wrapChildren = (children, index) => {
    const moduleID = _.get(this.props, ['anchors', index, 'id'], `side_bar_module_${index}`)
    return (
      <Waypoint
        key={moduleID}
        onEnter={() => { this._setCurrentSection(moduleID) }}
        fireOnRapidScroll
        topOffset="2%"
        bottomOffset={(index + 1) === React.Children.count(children) ? '50%' : '95%'}
      >
        <div
          id={moduleID}
          ref={(node) => { this._moduleMap[moduleID] = node }}
        >
          {children}
        </div>
      </Waypoint>
    )
  }

  render() {
    const { children, anchors, show } = this.props
    return (
      <div>
        <Transition
          in={show}
          timeout={{
            enter: 300,
            exit: 350,
          }}
          appear
        >
          {status => (
            <Anchors
              show={status === 'entered' || status === 'exiting'}
              ref={(node) => { this.anchorsNode = node }}
              data={anchors}
              handleClickAnchor={this._handleClickAnchor}
              currentSection={this.state.currentSection}
            />
          )}
        </Transition>
        {React.Children.map(children, this._wrapChildren)}
      </div>
    )
  }
}

SideBar.defaultProps = {
  anchors: [],
  children: [],
  show: true,
}

SideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.function,
  })),
  children: PropTypes.array,
  show: PropTypes.bool,
  setPlaying: PropTypes.func.isRequired,
}

export default SideBar
