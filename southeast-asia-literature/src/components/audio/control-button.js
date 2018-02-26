import PauseIcon from '../../../svg/pause.svg'
import PlayIcon from '../../../svg/play.svg'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const IconWrapper = styled.button`
  width: ${props => props.width};
  height: ${props => props.height};
  background-color: #fff;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  user-select: none;
  outline: none;
  >svg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`

class ControlButton extends React.PureComponent {
  static propTypes = {
    isPlaying: PropTypes.bool.isRequired,
    togglePlaying: PropTypes.func.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
  }
  static defaultProps = {
    width: '54px',
    height: '54px',
  }
  render() {
    const {
      isPlaying,
      togglePlaying,
      width,
      height,
    } = this.props
    return (
      <IconWrapper
        width={width}
        height={height}
        isPlaying={isPlaying}
        onClick={togglePlaying}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </IconWrapper>
    )
  }
}

export default ControlButton
