import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const ProgressBackground = styled.div`
  width: 100%;
  height: 100%;
  background: ${props => props.background};
  position: absolute;
  top: 0;
  left: 0;
`
const ProgressIndicator = styled.div`
  height: 100%;
  width: ${props => props.width};
  background: ${props => props.background};
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
`
const ProgressBar = ({ containerBg, indicatorBg, percent }) => (
  <ProgressBackground background={containerBg}>
    <ProgressIndicator width={`${percent}%`} background={indicatorBg} />
  </ProgressBackground>
)

ProgressBar.defaultProps = {
  containerBg: '',
  indicatorBg: '',
  percent: 0,
}

ProgressBar.propTypes = {
  containerBg: PropTypes.string,
  indicatorBg: PropTypes.string,
  percent: PropTypes.number,
}

export default ProgressBar
