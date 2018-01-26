import { fontWeight, zIndex } from '../constants/style-variables'
import mq from '../utils/media-query'
import React from 'react'
import styled from 'styled-components'

const textPart1 = '衛星照片來源：Google Earth, Copernicus'
const textPart2 = '衛星照片來源：Google Earth, 2018 DigitalGlobe, 2018 CNES / Airbus'

const Text = styled.div`
  opacity: ${props => (props.show ? 0.5 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: opacity 800ms ease, visibility 200ms ease 300ms;
  position: fixed;
  color: #b8b8b8;
  font-weight: ${fontWeight.light};
  z-index: ${zIndex.credit};
  white-space: nowrap;
  ${mq.mobileOnly`
    right: 8px;
    bottom: 4px;
    font-size: 10px;
    max-width: 90%;
  `}
  ${mq.tabletOnly`
    right: 25px;
    bottom: 20px;
    font-size: 14px;
  `}
  ${mq.desktopAbove`
    left: 20px;
    bottom: 16px;
    font-size: 14px;
  `}
  ${mq.hdAbove`
    left: 50%;
    transform: translateX(-700px);
  `}
`

const off = [0, 1, 11, 18]

const Credit = (props) => {
  const { currentIndex } = props
  const test = ele => ele === currentIndex
  const show = off.findIndex(test) === -1
  const text = currentIndex <= 9 ? textPart1 : textPart2
  return (
    <Text show={show}>{text}</Text>
  )
}

export default Credit
