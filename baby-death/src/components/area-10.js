/* eslint  react/no-array-index-key: 0 */
import React from 'react'
import bed from '../../static/area-10/a10-bed.png'
import baby from '../../static/area-10/a10-baby.png'
import number1 from '../../static/area-10/a10-number-1.png'
import number2 from '../../static/area-10/a10-number-2.png'
import number3 from '../../static/area-10/a10-number-3.png'
import number4 from '../../static/area-10/a10-number-4.png'
import number5 from '../../static/area-10/a10-number-5.png'
import city1 from '../../static/area-10/a10-city-1.png'
import city2 from '../../static/area-10/a10-city-2.png'
import city3 from '../../static/area-10/a10-city-3.png'
import city4 from '../../static/area-10/a10-city-4.png'
import city5 from '../../static/area-10/a10-city-5.png'
import reusedComponents from './reused-components'
import styled from 'styled-components'
import withAreaWrapper from './area-wrapper'
import merge from 'lodash.merge'

const _ = {
  merge,
}

const {
  StyledOpacityAnimatedBlock,
  StyledScaleAnimatedBlock,
} = reusedComponents

const mockup = {
  animationBlock: {
    width: 351,
    height: 445,
  },
  beds: [{
    left: 0,
    top: 269,
    src: bed,
  }, {
    left: 72,
    top: 269,
    src: bed,
  }, {
    left: 144,
    top: 269,
    src: bed,
  }, {
    left: 216,
    top: 269,
    src: bed,
  }, {
    left: 282,
    top: 269,
    src: bed,
  }],
  babies: [{
    left: 0,
    top: 259,
    amount: 19,
    src: baby,
  }, {
    left: 77,
    top: 259,
    amount: 12,
    src: baby,
  }, {
    left: 149,
    top: 259,
    amount: 11,
    src: baby,
  }, {
    left: 221,
    top: 259,
    amount: 10,
    src: baby,
  }, {
    left: 287,
    top: 259,
    amount: 7,
    src: baby,
  }],
  numbers: [{
    _width: 97,
    left: 0,
    top: 0,
    src: number1,
  }, {
    _width: 64,
    left: 72,
    top: 96,
    src: number2,
  }, {
    _width: 64,
    left: 144,
    top: 108,
    src: number3,
  }, {
    _width: 64,
    left: 216,
    top: 120,
    src: number4,
  }, {
    _width: 64,
    left: 282,
    top: 138,
    src: number5,
  }],
  districts: [{
    _width: 65,
    left: 0,
    top: 413,
    src: city1,
  }, {
    _width: 65,
    left: 71,
    top: 413,
    src: city2,
  }, {
    _width: 65,
    left: 143,
    top: 413,
    src: city3,
  }, {
    _width: 65,
    left: 215,
    top: 413,
    src: city4,
  }, {
    _width: 65,
    left: 287,
    top: 413,
    src: city5,
  }],
}

const StyledBed = styled.img`
  position: absolute;
  width: ${(64 / mockup.animationBlock.width) * 100}%;
  left: ${props => (props.left / mockup.animationBlock.width) * 100}%;
  top: ${props => (props.top / mockup.animationBlock.height) * 100}%;
`

class Area10 extends React.PureComponent {
  _renderDistricts(blocks, duration = 0, delay = 500) {
    const partialDur = duration / blocks.length
    return blocks.map((block, index) => {
      return (
        <StyledScaleAnimatedBlock
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          duration={partialDur}
          delay={/* index * partialDur + delay */ delay}
          animationBlock={mockup.animationBlock}
          {...block}
        />
      )
    })
  }

  _renderNumbers(blocks, duration = 0, delay = 500) {
    return this._renderDistricts(blocks, duration, delay)
  }

  _renderBabies(blocks, duration, delay = 500) {
    return blocks.map((block) => {
      return this._renderBabiesPerColumn(block, duration, delay)
    })
  }

  _renderBabiesPerColumn(column, duration, delay = 500) {
    const blocks = []
    for (let i = 0; i < column.amount; i += 1) {
      // 8 is babies distance
      blocks.push(_.merge({}, column, {
        top: column.top - (i * 12),
      }))
    }

    return blocks.map((block, index) => {
      const partialDur = duration / block.amount
      return (
        <StyledOpacityAnimatedBlock
          animationBlock={mockup.animationBlock}
          duration={partialDur}
          delay={(index * partialDur) + delay}
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          zIndex={index}
          _width={48}
          {...block}
        />
      )
    })
  }

  _renderBeds() {
    return mockup.beds.map((_bed, index) => {
      return (
        <StyledBed
          key={`${_bed.src}_${index}`}
          {..._bed}
        />
      )
    })
  }

  render() {
    const durations = {
      babies: 800,
      districts: 300,
      numbers: 500,
      offset: 200,
    }
    return (
      <React.Fragment>
        {this._renderBeds()}
        {this._renderDistricts(mockup.districts, durations.districts, 0)}
        {this._renderBabies(mockup.babies, durations.babies, durations.districts + durations.offset)}
        {this._renderNumbers(mockup.numbers, durations.numbers, (durations.offset * 2) + durations.districts + durations.babies)}
      </React.Fragment>
    )
  }
}
export default withAreaWrapper(mockup.animationBlock, Area10)
