import ArrowDownIcon from '../../../static/arrow-down.svg'
import styled, { keyframes } from 'styled-components'
import React from 'react'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import { zIndex } from '../../constants/style-variables'

const moveY = keyframes`
  from {
    transform: translateY(0);
  }

  50% {
    transform: translateY(26px);
  }

  to {
    transform: translateY(0);
  }
`

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Container = styled.div`
  cursor: pointer;
  z-index: ${zIndex.nextPageBtn};
  width: 24px;
  bottom: 45px;
  ${mq.desktopAbove`
    width: 36px;
    bottom: 50px;
  `}
  >svg {
    width: 100%;
    animation-name: ${moveY};
    animation-duration: 1800ms;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }
  position: fixed;
  text-align: center;
  left: 51.1%;
  
  transform: translateX(-50%);
  animation-name: ${fadeIn};
  animation-delay: 5000ms;
  animation-duration: 1200ms;
  animation-fill-mode: both;
`

const NextPageBtn = ({ handleClick }) => {
  return (
    <Container onClick={handleClick}><ArrowDownIcon /></Container>
  )
}

NextPageBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default NextPageBtn
