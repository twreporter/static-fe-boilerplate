// import smoothScroll from 'smoothscroll'
// import Transition from 'react-transition-group/Transition'
// import Waypoint from 'react-waypoint'
import { fontWeight, zIndex } from '../../constants/style-variables'
import get from 'lodash.get'
import map from 'lodash.map'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import BurgerIcon from '../../../svg/side-bar-icons/burger.svg'
import CrossIcon from '../../../svg/side-bar-icons/cross.svg'

const mainColor = '#a67a44'
const white = '#fff'

const _ = {
  get,
  map,
}

const Container = styled.div`
  opacity: ${props => (props.show ? '1' : '0')};
  transition: opacity 300ms ease;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.sideBar};
  ${mq.tabletAbove`
    background-color: ${white};
    min-width: 92px;
  `}
`

const ButtonsWrapper = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  ${mq.tabletAbove`
    display: flex;
    justify-content: flex-end;
  `}
`

const AnchorsWrapper = styled.div`
  position: relative;
  width: 49px;
  display: flex;
  flex-direction: column;
  ${mq.mobileOnly`
    align-items: flex-start;
    transform: translateX(${props => (props.mobileAnchorsShow ? '0' : '-105%')});
    transition: transform 370ms ease;
  `}
  ${mq.tabletAbove`
    margin-right: 15px;
    align-items: flex-end;
  `}
`

const Anchor = styled.div`
  box-sizing: border-box;
  position: relative;
  top: ${props => -7 * props.i}px;
  width: ${props => (props.isOn ? '49px' : '36px')};
  background-color: ${props => (props.isOn ? mainColor : white)};
  transition: opacity 300ms ease, width 300ms ease, background-color 300ms ease;
  padding: 10px 10px 14px 10px;
  cursor: pointer;
  border: 1px solid ${mainColor};
  ${mq.mobileOnly`
    border-radius: 0 10% 10% 0;
  `}
  ${mq.tabletAbove`
    border-radius: 10% 0 0 10%;
  `}
`

const MobileAnchorsToggle = styled.div`
  width: 36px;
  box-sizing: border-box;
  position: relative;
  background-color: ${white};
  margin-bottom: 14px;
  padding: 10px 10px 14px 10px;
  cursor: pointer;
  border: 1px solid ${mainColor};
  box-shadow: 2px 2px 4px 0 rgba(183, 183, 183, 0.8);
  border-radius: 0 10% 10% 0;
  opacity: ${props => (props.mobileAnchorsShow ? '1' : '.4')};
  transition: opacity 300ms ease;
  :active, :focus {
    opacity: 1;
  }
  ${mq.tabletAbove`
    display: none;
  `}
  >svg {
    width: 100%;
  }
`

const LabelText = styled.div`
  writing-mode: tb;
  writing-mode: vertical-lr;
  opacity: ${props => (props.isOn ? '0' : '1')};
  font-size: 13px;
  letter-spacing: .2em;
  white-space: nowrap;
  font-weight: ${fontWeight.bold};
  color: ${mainColor};
`

// const LabelIcon = styled.div`
//   position: absolute;
//   opacity: ${props => (props.isOn ? '1' : '0')};
//   top: 50%;
//   right: 50%;
//   transform: translate(50%, -50%);
//   width: 50%;
// `

const LabelIcon = styled.div`
  position: absolute;
  opacity: ${props => (props.isOn ? '1' : '0')};
  background-image: url(${props => props.labelIcon});
  background-position: center center;
  background-size: 60%;
  background-repeat: no-repeat;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  width: 100%;
  height: 100%;
`

class Anchors extends React.PureComponent {
  static propTypes = {
    handleClickAnchor: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      // label: PropTypes.func,
      label: PropTypes.string,
    })),
    currentSection: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    data: [],
  }

  constructor(props) {
    super(props)
    this.state = {
      mobileAnchorsShow: false,
    }
  }

  _buildAnchorComponent = (anchorObj, i) => {
    const moduleID = _.get(anchorObj, 'id', '')
    // const ModuleLabel = _.get(anchorObj, 'label')
    const labelIcon = _.get(anchorObj, 'label')
    // moduleID and moduleLable are not empty string
    // if (moduleID && ModuleLabel) {
    if (moduleID && labelIcon) {
      const moduleText = _.get(anchorObj, 'text', '')
      const { currentSection } = this.props
      const isOn = currentSection === moduleID
      const anchorJSX = (
        <Anchor
          isOn={isOn}
          onClick={(e) => { this.props.handleClickAnchor(moduleID, e) }}
          key={`SectionButton_${moduleID}`}
          i={i}
        >
          <LabelText isOn={isOn}>{moduleText}</LabelText>
          {/* <LabelIcon isOn={isOn}><ModuleLabel /></LabelIcon> */}
          <LabelIcon labelIcon={labelIcon} isOn={isOn} />
        </Anchor>
      )
      return anchorJSX
    }
    return null
  }

  _toggleMobileAnchors = () => {
    this.setState(prevState => ({
      mobileAnchorsShow: !prevState.mobileAnchorsShow,
    }))
  }

  render() {
    const { data, show } = this.props
    const { mobileAnchorsShow } = this.state
    return (
      <Container show={show}>
        <ButtonsWrapper>
          <MobileAnchorsToggle
            key="Mobile_Anchors_Toggle"
            onClick={this._toggleMobileAnchors}
            mobileAnchorsShow={mobileAnchorsShow}
          >
            {mobileAnchorsShow ? <CrossIcon /> : <BurgerIcon />}
          </MobileAnchorsToggle>
          <AnchorsWrapper mobileAnchorsShow={mobileAnchorsShow}>
            {[_.map(data, this._buildAnchorComponent)]}
          </AnchorsWrapper>
        </ButtonsWrapper>
      </Container>
    )
  }
}

export default Anchors
