import { fontWeight } from '../../constants/style-variables'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const openAnimation = targetWidth => keyframes`
  from {
    height: 5px;
    width: 5px;
  }
  to {
    height: 100%;
    width: ${targetWidth};
  }
`

const PopUpContainer = styled.div`
  display: ${props => (props.open ? 'block' : 'none')};
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  overflow: hidden;
  z-index: 98;
  ${mq.mobileOnly`
    width: 100%;
    animation: ${openAnimation('100%')} 200ms ease-out;
  `}
  ${mq.tabletOnly`
    width: 50%;
    animation: ${openAnimation('50%')} 300ms ease-out;
  `}
  ${mq.desktopAbove`
    width: 384px;
    animation: ${openAnimation('384px')} 300ms ease-out;
  `}
`

const Toggle = styled.div`
  border-radius: 100% 0 0 0;
  background: #e75f55;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 52px;
  height: 52px;
  z-index: 99;
  cursor: pointer;
  &::after {
    content: "${props => (props.open ? '✕' : '註')}";
    display: block;
    font-size: ${props => (props.open ? '28px' : '16px')};
    font-weight: ${fontWeight.bold};
    position: absolute;
    bottom: 43%;
    right: 40%;
    transform: translate(50%, 50%);
    color: #EEE;
  }
`

const PopUpContent = styled.div`
  position: relative;
  margin: 0 auto;
  color: #eeeeee;
  width: 84%;
  top: 30px;
  ${mq.tabletOnly`
    top: 5%;
  `}
  ${mq.desktopAbove`
    width: 320px;
    top: 13%;
  `}
  h3 {
    font-weight: ${fontWeight.bold};
    font-size: 18px;
    line-height: 1.88;
    margin-bottom: 15px; 
  }
  p {
    font-weight: ${fontWeight.light};
    ${mq.mobileOnly`
      font-size: 16px;
    `}
    font-size: 18px;
    line-height: 1.63;
    margin-bottom: 1em;
  }
`

export default class PopUp extends PureComponent {
  static propTypes = {
    isFocus: PropTypes.bool,
    children: PropTypes.node.isRequired,
  }
  static defaultProps = {
    isFocus: false,
  }
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.toggle = this._toggle.bind(this)
  }
  _toggle() {
    this.setState({ open: !this.state.open })
  }
  render() {
    const { open } = this.state
    const { children, isFocus } = this.props
    return (
      <React.Fragment>
        <Toggle onClick={this.toggle} open={open} />
        <PopUpContainer open={isFocus && open}>
          <PopUpContent>
            {children}
          </PopUpContent>
        </PopUpContainer>
      </React.Fragment>
    )
  }
}
