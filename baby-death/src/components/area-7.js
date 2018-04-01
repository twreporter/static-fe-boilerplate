/* eslint react/no-array-index-key: 0 */
import React from 'react'
import ambulance from '../../static/area-7/a7-ambulance.png'
import city1 from '../../static/area-7/a7-city-1.png'
import city2 from '../../static/area-7/a7-city-2.png'
import city3 from '../../static/area-7/a7-city-3.png'
import city4 from '../../static/area-7/a7-city-4.png'
import city5 from '../../static/area-7/a7-city-5.png'
import reusedComponents from './reused-components'
import smoke from '../../static/area-7/a7-smoke.png'
import styled from 'styled-components'
import withAreaWrapper from './area-wrapper'
import merge from 'lodash.merge'

const _ = {
  merge,
}

const { StyledOpacityAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 373,
    height: 347,
  },
  cities: [
    {
      _width: 151,
      left: 36,
      top: 20,
      src: city1,
    },
    {
      _width: 151,
      left: 177,
      top: 82,
      src: city2,
    },
    {
      _width: 151,
      left: 15,
      top: 149,
      src: city3,
    },
    {
      _width: 151,
      left: 209,
      top: 185,
      src: city4,
    },
    {
      _width: 151,
      left: 36,
      top: 257,
      src: city5,
    },
  ],
}

mockup.ambulances = mockup.cities.map((ele) => {
  return _.merge({}, ele, { src: ambulance })
})

mockup.smokes = mockup.cities.map((ele) => {
  return _.merge({}, ele, {
    src: smoke,
    _width: 27,
    left: ele.left + ele._width + 5,
    top: ele.top + 25,
  })
})

const StyledCity = styled.img`
  position: absolute;
  width: ${props => (props._width / mockup.animationBlock.width) * 100}%;
  left: ${props => (props.left / mockup.animationBlock.width) * 100}%;
  top: ${props => (props.top / mockup.animationBlock.height) * 100}%;
`

const StyledAmbulance = StyledCity.extend`
  will-change: transform;
  transform: translateX(${props => (props.toShow ? -(((props.left / props._width) * 100) + 105) : '0')}%);
  transition: transform ${props => props.duration}ms ease-out ${props => props.delay}ms;
`

class Area7 extends React.PureComponent {
  _renderCities() {
    return mockup.cities.map((city) => {
      return (
        <StyledCity
          key={city.src}
          {...city}
        />
      )
    })
  }

  _renderAnimatedBlocks(blocks, duration, delay, Component) {
    const _duration = duration / blocks.length
    return blocks.map((block, index) => {
      return (
        <Component
          key={`${block.src}_${index}`}
          animationBlock={mockup.animationBlock}
          duration={_duration}
          delay={(_duration * index) + delay}
          toShow={this.props.toAnimate}
          {...block}
        />
      )
    })
  }

  render() {
    const duration = 2500 // ms
    return (
      <React.Fragment>
        {this._renderCities()}
        {this._renderAnimatedBlocks(mockup.ambulances, duration, 500, StyledAmbulance)}
        {this._renderAnimatedBlocks(mockup.smokes, 1500, 0, StyledOpacityAnimatedBlock)}
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area7)
