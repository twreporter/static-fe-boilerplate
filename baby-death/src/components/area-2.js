/* eslint react/no-array-index-key:0 */
import React from 'react'
import bg from '../../static/area-2/a2-bg.png'
import angel from '../../static/area-2/a2-angel.png'
import data1 from '../../static/area-2/a2-data-1.png'
import data2 from '../../static/area-2/a2-data-2.png'
import data3 from '../../static/area-2/a2-data-3.png'
import data4 from '../../static/area-2/a2-data-4.png'
import data5 from '../../static/area-2/a2-data-5.png'
import withAreaWrapper from './area-wrapper'
import reusedComponents from './reused-components'
import styled from 'styled-components'
import merge from 'lodash.merge'

const _ = {
  merge,
}

const { StyledSlideUpAnimatedBlocks, StyledScaleAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 345,
    height: 341,
  },
  angels: [
    {
      _width: 50,
      left: 6,
      top: 237,
      amount: 9,
      src: angel,
    },
    {
      _width: 50,
      left: 76,
      top: 237,
      amount: 6,
      src: angel,
    },
    {
      _width: 50,
      left: 146,
      top: 237,
      amount: 5,
      src: angel,
    },
    {
      _width: 50,
      left: 216,
      top: 237,
      amount: 5,
      src: angel,
    },
    {
      _width: 50,
      left: 286,
      top: 237,
      amount: 4,
      src: angel,
    },
  ],
  numbers: [
    {
      _width: 50,
      left: 8,
      top: 0,
      src: data1,
    },
    {
      _width: 50,
      left: 77,
      top: 76,
      src: data2,
    },
    {
      _width: 32,
      left: 152,
      top: 102,
      src: data3,
    },
    {
      _width: 50,
      left: 217,
      top: 102,
      src: data4,
    },
    {
      _width: 32,
      left: 292,
      top: 128,
      src: data5,
    },
  ],
}

const StyledBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

class Area2 extends React.PureComponent {
  _renderNumbers(blocks, duration = 0, delay = 500) {
    const partialDur = duration / blocks.length
    return blocks.map((block, index) => {
      return (
        <StyledScaleAnimatedBlock
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          duration={partialDur}
          delay={/* ((index + 1) * partialDur) */ +delay}
          animationBlock={mockup.animationBlock}
          {...block}
        />
      )
    })
  }

  _renderAngels(blocks, duration = 0, delay = 500) {
    return blocks.map((block) => {
      return this._renderAngelsPerColumn(block, duration, delay)
    })
  }

  _renderAngelsPerColumn(column, duration = 0, delay = 500) {
    const partialDur = duration / column.amount
    const blocks = []
    for (let i = 0; i < column.amount; i += 1) {
      // 8 is diaper distance
      blocks.push(_.merge({}, column, { top: column.top - (i * 25) }))
    }
    return blocks.map((block, index) => {
      return (
        <StyledSlideUpAnimatedBlocks
          animationBlock={mockup.animationBlock}
          duration={partialDur}
          delay={(index * partialDur) + delay}
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          zIndex={blocks.length - index}
          {...block}
        />
      )
    })
  }

  render() {
    const durations = {
      angels: 2000,
      numbers: 500,
      offset: 300,
    }
    return (
      <React.Fragment>
        <StyledBackground
          src={bg}
        />
        {this._renderAngels(mockup.angels, durations.angels, durations.offset)}
        {this._renderNumbers(mockup.numbers, durations.numbers, durations.angels + durations.offset)}
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area2)
