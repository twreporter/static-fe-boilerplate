import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { fontWeight } from '../constants/style'
import mq from '../utils/media-query'

export const Button = styled.button`
  width: 310px;
  height: 45px;
  display: block;
  border-radius: 5px;
  border: solid 3px #ffffff;
  transition: color 400ms ease;
  line-height: 39px;
  text-align: center;
  margin: 10px auto;
  ${mq.desktopAbove`
    margin: 20px auto;
  `}
  cursor: pointer;
  color: #ffffff;
  font-size: 19px;
  font-weight: ${fontWeight.bold};
  opacity: ${props => (props.disable ? '.58' : '1')};
  background-color: ${props => props.bgColor};
  box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.3);
  transition: opacity 300ms ease;
  :active {
    background-color: ${props => props.bgActiveColor};
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.8);
    transform: translateY(1px);
  }
`

export default class LinkButton extends PureComponent {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
    to: PropTypes.string.isRequired,
    pageProps: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.string, PropTypes.func]).isRequired,
    disable: PropTypes.bool,
    bgColor: PropTypes.string,
    bgActiveColor: PropTypes.string,
  }

  static defaultProps = {
    pageProps: {},
    disable: false,
    bgColor: '#a2d4dd',
    bgActiveColor: '#8acbd7',
  }

  handleClick = (e) => {
    e.preventDefault()
    const { goTo, to, pageProps } = this.props
    return goTo(to, pageProps)
  }

  render() {
    const { disable, bgColor, bgActiveColor } = this.props
    if (disable) {
      return (
        <Button disable bgColor={bgColor}>
          {this.props.children}
        </Button>
      )
    }
    return (
      <Button onClick={this.handleClick} bgColor={bgColor} bgActiveColor={bgActiveColor}>
        {this.props.children}
      </Button>
    )
  }
}
