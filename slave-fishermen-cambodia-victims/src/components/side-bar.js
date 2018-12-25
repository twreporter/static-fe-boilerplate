/* eslint react/no-array-index-key:0 */
import PropTypes from 'prop-types'
import React from 'react'
import SideBarHOC from '@twreporter/react-components/lib/side-bar'
import imgSrc from '../data/img-src'
import layout from '../utils/layout'
import screen from '../utils/screen'
import styled from 'styled-components'
import theme from '../utils/theme'

const StyledAnchor = styled.div`
  cursor: pointer;
  position: relative;
  color: ${props => (props.highlight ? '#b15c76' : '#808080')};
  border-right: 2px solid ${props => (props.highlight ? '#b15c76' : '#808080')};
  opacity: ${props => (props.highlight ? '1' : '0.7')};
  padding-right: 17px;
  padding-top: 18px;
  padding-bottom: 18px;
  transition: all 200ms linear;
`

const Label = styled.div`
  font-size: ${theme.typography.font.size.xsmall};
  font-weight: ${theme.typography.font.weight.medium};
  line-height: 1;
  margin: 2px 3px;
`

const Order = styled.div`
  font-size: ${theme.typography.font.size.xsmall};
  position: absolute;
  top: 18px;
  left: -18px;
  transform: translateX(-50%);
`

class Anchor extends React.PureComponent {
  /**
   * render vertical word by word
   *
   * @param {string[]} words words to render vertically
   * @returns {Object[]} Label components
   */
  _assembleWord(words) {
    return words.split('').map((word, index) => {
      return (
        <Label key={`anchor_label_${index}`}>
          {word}
        </Label>
      )
    })
  }

  render() {
    const {
      highlight, handleClick, id, index, label,
    } = this.props
    return (
      <StyledAnchor
        highlight={highlight}
        onClick={(e) => { handleClick(id, e) }}
        key={`SectionButton_${id}`}
      >
        <Order>{`0${index}`}</Order>
        <div>{this._assembleWord(label)}</div>
      </StyledAnchor>
    )
  }
}

class Anchors extends React.PureComponent {
  render() {
    const anchorBts = []
    const { data, currentAnchorId, handleClickAnchor } = this.props
    let index = 1
    data.forEach((anchorObj) => {
      const { id, label } = anchorObj

      // id and label are not empty string
      if (id && label) {
        anchorBts.push(<Anchor
          key={`anchor_${index}`}
          handleClick={handleClickAnchor}
          highlight={id === currentAnchorId}
          id={id}
          index={index}
          label={label}
        />)
        index += 1
      }
    })
    return (
      <React.Fragment>
        { anchorBts }
      </React.Fragment>
    )
  }
}

Anchors.defaultProps = {
  currentAnchorId: '',
  data: [],
  handleClickAnchor: () => {},
}

Anchors.propTypes = {
  currentAnchorId: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
  })),
  handleClickAnchor: PropTypes.func,
}

const sideBarBgWidth = '145'

const AnchorsContainer = styled.div`
  z-index: 0;
  position: fixed;
  color: ${theme.colors.gray50};
  left: 50%;
  top: 50%;
  transform: translate(-${(layout.hd.width.large - layout.hd.offset.sidebar) / 2}px, -50%);
  visibility: ${props => (props.toShow ? 'visible' : 'hidden')};
  opacity: ${props => (props.toShow ? 1 : 0)};
  transition: opacity 0.5s linear;
  ${screen.desktopAbove`
    left: 5%;
    transform: translate(-50%, -50%);
  `}
  ${screen.tabletBelow`
    left: 3%;
    transform: translate(-50%, -50%);
    z-index: 200;
    display: block;
    left: 0;
    transform: translate(${props => (props.isToggled ? `${sideBarBgWidth / 2}px, -50%` :
    `-${sideBarBgWidth / 2}px, -50%`)});
    transition: transform 0.3s ease-in;
  `}
`

const MobileSideBarController = styled.div`
  display: none;
  ${screen.tabletBelow`
    z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 30px;
    height: 43px;
    cursor: pointer;
    display: ${props => (props.toShow ? 'block' : 'none')};
    transform: translateX(${props => (props.isToggled ? sideBarBgWidth : '0')}px);
    transition: transform 300ms linear;
  `};
`

const MobileBackground = styled.div`
  ${screen.tabletBelow`
    display: ${props => (props.toShow ? 'block' : 'none')};
    z-index: 199;
    position: fixed;
    top: 50%;
    left: -${sideBarBgWidth}px;
    width: ${sideBarBgWidth}px;
    height: 100%;
    top: 0%;
    background-color: #13191f;
    border-right: 1px solid #f2f2f2;
    transform: translateX(${props => (props.isToggled ? '145px' : '0px')});
    transition: transform 300ms linear;
  `}
`

const BackButton = styled.img`
  width: 30px;
`

const HamburgerButton = styled.img`
  width: 30px;
`

class SideBar extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isToggled: false,
    }

    this.toggleMobileSideBar = this._toggleMobileSideBar.bind(this)
  }

  _toggleMobileSideBar() {
    this.setState({
      isToggled: !this.state.isToggled,
    })
  }

  render() {
    // currentAnchorId and handleClickAnchor are passed from `SideBarHOC`
    const {
      anchors, children, currentAnchorId, handleClickAnchor,
    } = this.props
    const { isToggled } = this.state
    return (
      <div>
        <AnchorsContainer
          toShow={isToggled || currentAnchorId}
          isToggled={isToggled}
        >
          <Anchors
            data={anchors}
            handleClickAnchor={handleClickAnchor}
            currentAnchorId={currentAnchorId}
          />
        </AnchorsContainer>
        <MobileSideBarController
          isToggled={isToggled}
          onClick={this.toggleMobileSideBar}
          toShow={isToggled || currentAnchorId}
        >
          {
            isToggled ? 
              <BackButton src={imgSrc['sidebar_close']} />
              : 
              <HamburgerButton src={imgSrc['sidebar_open']} />
          }
        </MobileSideBarController>
        <MobileBackground
          isToggled={isToggled}
          toShow={isToggled || currentAnchorId}
        />
        {children}
      </div>
    )
  }
}

SideBar.defaultProps = {
  currentAnchorId: '',
  handleClickAnchor: () => {},
}

SideBar.propTypes = {
  anchors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  })).isRequired,
  currentAnchorId: PropTypes.string,
  handleClickAnchor: PropTypes.func,
}

export default SideBarHOC(SideBar)
