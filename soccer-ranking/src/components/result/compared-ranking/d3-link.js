import { linkHorizontal as d3Link } from 'd3-shape'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const Moving = keyframes`
  from {
    stroke-dashoffset: 2000;
  }
  to {
    stroke-dashoffset: 0;
  }
`

const Path = styled.path`
  stroke-dasharray: 2000;
  stroke-dashoffset: 0;
  animation: ${Moving} 2000ms ease-in 1200ms both;
  opacity: ${props => props.opacity};
  &:hover {
    opacity: 1;
  }
`

export default class D3Link extends PureComponent {
  static propTypes = {
    pathCoordinates: PropTypes.shape({
      start: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
      end: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { pathCoordinates, ...elseProps } = this.props
    const { start, end } = pathCoordinates
    const calculatePathD = d3Link()
      .x(d => d.x)
      .y(d => d.y)
    return (
      <Path
        d={calculatePathD({
          source: start,
          target: end,
        })}
        fill="none"
        {...elseProps}
      />
    )
  }
}
