/* eslint-disable function-paren-newline */
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import mq from '../utils/media-query'
import pathProcessor from '../utils/path-processor'
import { colors } from '../styles/common-variables'

const _ = {
  get,
}

const AnchorContainer = styled.div`
  position: fixed;
  left: 66px;
  top: 50%;
  z-index: 101;
  transform: translateY(-50%);
  display: ${props => (props.ifshowUp ? 'initial' : 'none')};
  height: 440px;
  &::before {
    content: "";
    height: 440px;
    display: inline-block;
    border-right: solid;
    border-right-width: 2px;
    border-right-color: ${props => (props.textColor ? props.textColor : 'white')};
    padding-right: 36px;
    opacity: 0.6;
  }
  ${mq.mobile`
    left: ${props => (props.ifToggled ? '66px' : '-66px')};
    &::before {
      border-right-color: ${colors.textBlack};
    }
  `};
  transition: left 300ms linear;
`

const Anchor = styled.div`
  &:hover {
    cursor: pointer;
  }
  height: 110px;
  font-size: 13px;
  color: ${props => (props.textColor ? props.textColor : 'white')};
  background: transparent;
  opacity: ${props => (props.highlight ? 1 : 0.6)};
  position: absolute;
  top: ${props => (props.index ? `${(props.index * 110)}px` : '0')};
  border-right: ${props => (props.highlight ? 'solid' : 'none')};
  border-right-width: 2px;
  border-right-color: ${props => (props.textColor ? props.textColor : 'white')};
  padding-right: 17px;
  transition: all 200ms linear;
  ${mq.mobile`
    color: ${colors.textBlack};
    border-right-color: ${colors.textBlack};
  `};
`

const AnchorText = styled.div`
  margin-top: 12.5px;
  position: relative;
`

const Order = styled.div`
  position: absolute;
  top: 0;
  left: -18px;
  transform: translateX(-50%);
`

const Label = styled.div`
  display: block;
  margin: 2px 3px;
  padding: 0;
  font-weight: 500;
  line-height: 14px;
`

const SideBarController = styled.img`
  display: none;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  width: 30px;
  height: 43px;
  cursor: pointer;
  ${mq.mobile`
    display: ${props => (props.ifshowUp ? 'initial' : 'none')};
    left: ${props => (props.ifToggled ? '145px' : '0')};
  `};
  transition: all 300ms linear;
`

const MobileBackground = styled.div`
  z-index: 100;
  position: fixed;
  left: -165px;
  width: 165px;
  height: 100vh;
  background-color: white;
  display: ${props => (props.ifshowUp ? 'initial' : 'none')};
  ${(props) => {
    if (props.ifToggled) {
      return `
        border-right: 1px solid #f2f2f2;
        transform: translateX(145px);
      `
    }
  }};
  transition: all 300ms linear;
`

class Anchors extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSection: _.get(this.props, 'data.0.id'),
      ifToggled: false,
    }
    this.changeHighlight = this._changeHighlight.bind(this)
    this.toggle = this._toggle.bind(this)
  }

  _changeHighlight(currentSection) {
    this.setState({
      currentSection,
    })
  }

  _toggle() {
    this.setState({
      ifToggled: !this.state.ifToggled,
    })
  }


  render() {
    const { textColor, data, ifshowUp } = this.props
    const AssembleWord = (words) => {
      return words.split('').map((word) => {
        return (
          <Label key={`anchor_label_${word}`}>
            {word}
          </Label>
        )
      })
    }
    const anchorBts = []
    data.forEach((anchorObj, index) => {
      const moduleID = _.get(anchorObj, 'id', '')
      const moduleLabel = _.get(anchorObj, 'label', '')
      // moduleID and moduleLable are not empty string
      if (moduleID && moduleLabel) {
        anchorBts.push(
          <Anchor
            highlight={moduleID === this.state.currentSection}
            onClick={(e) => { this.props.handleClickAnchor(moduleID, e) }}
            key={`SectionButton_${moduleID}`}
            textColor={textColor}
            index={index - 1}
          >
            <AnchorText>
              <Order>{`0${index}`}</Order>
              <div>{AssembleWord(moduleLabel)}</div>
            </AnchorText>
          </Anchor>)
      }
    })
    return (
      <div>
        <AnchorContainer
          ifshowUp={ifshowUp}
          textColor={textColor}
          ifToggled={this.state.ifToggled}
        >
          { anchorBts }
        </AnchorContainer>
        <MobileBackground
          ifToggled={this.state.ifToggled}
          ifshowUp={ifshowUp}
        />
        <SideBarController
          ifshowUp={ifshowUp}
          onClick={this.toggle}
          ifToggled={this.state.ifToggled}
          src={this.state.ifToggled ? pathProcessor('sidebar_button_back.png') : pathProcessor('sidebar_button.png')}
        />
      </div>
    )
  }
}

Anchors.defaultProps = {
  data: [],
  ifshowUp: false,
}

Anchors.propTypes = {
  handleClickAnchor: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  textColor: PropTypes.string.isRequired,
  ifshowUp: PropTypes.bool,
}

class SideBar extends React.Component {
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
      // To trigger onLeave of waypoint, we need plus 1
      return smoothScroll(node.offsetTop + 1)
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
    const {
      children, anchors, ifshowUp, textColor,
    } = this.props
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
        <Anchors
          ref={(node) => { this.anchorsNode = node }}
          data={anchors}
          handleClickAnchor={this.scrollTo}
          textColor={textColor}
          ifshowUp={ifshowUp}
        />
        {webSiteContent}
      </div>
    )
  }
}

SideBar.defaultProps = {
  children: [],
  anchors: [],
  ifshowUp: false,
  textColor: 'white',
}

SideBar.propTypes = {
  children: PropTypes.array,
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  ifshowUp: PropTypes.bool,
  textColor: PropTypes.string,
}

export default SideBar
