import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { screen } from './styles/utils'

const _ = {
  get,
}

const Container = styled.div`
  background-color: #FFFFFF;
  height: 100%;
  left: 0px;
  position: fixed;
  top: 0px;
  z-index: 100;
  ${screen.mobileOnly`
    display: none;
  `}
`

const AnchorsContainer = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`

const Anchor = styled.div`
  padding: 20px;
  &:hover {
    cursor: pointer;
  }
`

const Label = styled.div`
  color: #a67a44;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.5;
  width: 13px;
  border-bottom: ${props => (props.highlight ? 'solid 4px #a67a44' : '')};
`

class Anchors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: _.get(this.props, 'data.0.id'),
    }
    this.changeHighlight = this._changeHighlight.bind(this)
  }

  _changeHighlight(currentSection) {
    this.setState({
      currentSection,
    })
  }

  render() {
    const anchorBts = []
    this.props.data.forEach((anchorObj) => {
      const moduleID = _.get(anchorObj, 'id', '')
      const ModuleLabel = _.get(anchorObj, 'label')

      // moduleID and moduleLable are not empty string
      if (moduleID && ModuleLabel) {
        const anchorJSX = (
          <Anchor
            onClick={(e) => { this.props.handleClickAnchor(moduleID, e) }}
            key={`SectionButton_${moduleID}`}
          >
            <ModuleLabel />
          </Anchor>
        )
        anchorBts.push(anchorJSX)
      }
    })
    return (
      <AnchorsContainer>
        { anchorBts }
      </AnchorsContainer>
    )
  }
}

Anchors.defaultProps = {
  data: [],
}

Anchors.propTypes = {
  handleClickAnchor: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.func,
  })),
}

class SideBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.scrollTo = this._scrollTo.bind(this)
    this.handleOnEnter = this._handleOnEnter.bind(this)
    this.handleOnLeave = this._handleOnLeave.bind(this)
    // moduleID to Module
    this.moduleMap = {}
    this.currentSection = ''
    this.previousSection = ''
  }

  componentWillUnmount() {
    this.moduleMap = {}
  }

  _scrollTo(moduleID, e) {
    e.preventDefault()
    const node = this.moduleMap[moduleID]
    if (node) {
      return smoothScroll(node.offsetTop)
    }
    return null
  }

  _handleOnEnter(nextSection) {
    this.anchorsNode.changeHighlight(nextSection)
    this.previousSection = this.currentSection
    this.currentSection = nextSection
  }

  _handleOnLeave(onLeaveSection) {
    if (onLeaveSection === this.currentSection) {
      this.currentSection = this.previousSection
      this.anchorsNode.changeHighlight(this.previousSection)
      this.previousSection = onLeaveSection
    }
  }

  render() {
    const { children, anchors } = this.props
    let modules = children
    if (children && !Array.isArray(children)) {
      modules = [children]
    }
    if (this.currentSection === '') {
      this.currentSection = _.get(anchors, '0.id')
    }
    const webSiteContent = modules.map((module, index) => {
      const moduleID = _.get(anchors, [index, 'id'], `side_bar_module_${index}`)
      return (
        <Waypoint
          key={moduleID}
          onLeave={() => { this.handleOnLeave(moduleID) }}
          onEnter={() => { this.handleOnEnter(moduleID) }}
          fireOnRapidScroll
          topOffset="4%"
          bottomOffset={(index + 1) === modules.length ? '50%' : '95%'}
        >
          <div
            id={moduleID}
            ref={(node) => { this.moduleMap[moduleID] = node }}
          >
            {module}
          </div>
        </Waypoint>
      )
    })

    return (
      <div>
        <Container>
          <Anchors
            ref={(node) => { this.anchorsNode = node }}
            data={anchors}
            handleClickAnchor={this.scrollTo}
          />
        </Container>
        {webSiteContent}
      </div>
    )
  }
}

SideBar.defaultProps = {
  anchors: [],
  children: [],
  isShow: true,
}

SideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.function,
  })),
  children: PropTypes.array,
  isShow: PropTypes.bool,
}

export default SideBar
