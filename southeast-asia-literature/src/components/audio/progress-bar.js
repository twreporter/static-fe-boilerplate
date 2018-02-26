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
const ProgressIndicator = styled.div.attrs({
  style: ({ percent }) => ({
    width: `${percent}%`,
  }),
})`
  height: 100%;
  background: ${props => props.background};
  position: absolute;
  top: 0;
  left: 0;
`

const ProgressBar = ({ containerBg, indicatorBg, percent }) => (
  <ProgressBackground background={containerBg}>
    <ProgressIndicator percent={percent} background={indicatorBg} />
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
