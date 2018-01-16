import map from 'lodash.map'
import mq from '../../utils/media-query'
import React from 'react'
import styled from 'styled-components'
import timelineData from '../../data/timeline'

const _ = {
  map,
}

const total = timelineData.length
const allIndex = _.map(timelineData, data => data.index)
const maxIndex = Math.max(...allIndex)
const minIndex = Math.min(...allIndex)

const Container = styled.div`
  opacity: ${props => (props.show ? 1 : 0)};
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  transition: opacity 200ms ease 600ms, visibility 0ms linear 100ms;
  position: absolute;
  width: 15px;
  height: 100%;
  z-index: 999;
  ${mq.mobileOnly`
    left: 15px;
  `}
  ${mq.tabletOnly`
    left: 39px;
  `}
  ${mq.desktopAbove`
    right: 301px;
  `}
`

const getCirclePosition = (on, iInList, media) => {
  const upN = total - iInList - 1
  const marginN = upN + 1
  const initTopValue = (media === 'desktop') ? '21%' : '10%'
  const margin = (media === 'mobile') ? '2' : '4'
  const circleSize = (media === 'mobile') ? '7' : '11'
  const topValue = on ? initTopValue : `calc(92% - ${circleSize}px * ${upN} - ${margin}px * ${marginN})`
  return `top: ${topValue};`
}

const Circle = styled.div`
  width: 7px;
  height: 7px;
  ${mq.tabletAbove`
    width: 11px;
    height: 11px;
  `}
  background-color: #F0F0F0;
  border-radius: 50%;
  position: absolute;
  ${mq.mobileOnly`
    ${props => getCirclePosition(props.on, props.iInList, 'mobile')}
  `}
  ${mq.tabletOnly`
    ${props => getCirclePosition(props.on, props.iInList, 'tablet')}
  `}
  ${mq.desktopAbove`
    ${props => getCirclePosition(props.on, props.iInList, 'desktop')}
  `}
  transition: top 1070ms ease 100ms;
`


class Circles extends React.Component {
  _buildCircles = (data, iInList) => {
    const { currentIndex } = this.props
    const { index } = data
    const on = index <= currentIndex
    return (
      <Circle on={on} iInList={iInList} key={`circle-${index}`} />
    )
  }
  render() {
    const { currentIndex } = this.props
    const show = minIndex <= currentIndex && currentIndex <= maxIndex
    return (
      <Container show={show}>
        {_.map(timelineData, this._buildCircles)}
      </Container>
    )
  }
}

export default Circles
