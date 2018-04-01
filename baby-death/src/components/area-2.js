/* eslint react/no-array-index-key:0 */
import React from 'react'
import bg from '../../static/area-2/a2-bg.png'
import cloth from '../../static/area-2/a2-cloth.png'
import diaper from '../../static/area-2/a2-diaper.png'
import text1 from '../../static/area-2/a2-text-1.png'
import text2 from '../../static/area-2/a2-text-2.png'
import text3 from '../../static/area-2/a2-text-3.png'
import text4 from '../../static/area-2/a2-text-4.png'
import text5 from '../../static/area-2/a2-text-5.png'
import data1 from '../../static/area-2/a2-data-1.png'
import data2 from '../../static/area-2/a2-data-2.png'
import data3 from '../../static/area-2/a2-data-3.png'
import data4 from '../../static/area-2/a2-data-4.png'
import data5 from '../../static/area-2/a2-data-5.png'
import withAreaWrapper from './area-wrapper'
import reusedComponents from './reused-components'
import styled from 'styled-components'

const { StyledSlideDownAnimatedBlocks, StyledScaleAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 357,
    height: 319,
  },
  clothes: [
    {
      left: 5,
      top: 11,
      src: cloth,
    },
    {
      left: 76,
      top: 11,
      src: cloth,
    },
    {
      left: 147,
      top: 11,
      src: cloth,
    },
    {
      left: 218,
      top: 11,
      src: cloth,
    },
    {
      left: 289,
      top: 11,
      src: cloth,
    },
  ],
  diapers: [
    {
      left: 19,
      top: 70,
      amount: 16,
      src: diaper,
    },
    {
      left: 90,
      top: 70,
      amount: 9,
      src: diaper,
    },
    {
      left: 161,
      top: 70,
      amount: 6,
      src: diaper,
    },
    {
      left: 233,
      top: 70,
      amount: 5,
      src: diaper,
    },
    {
      left: 303,
      top: 70,
      amount: 3,
      src: diaper,
    },
  ],
  numbers: [
    {
      _width: 58,
      left: 10,
      top: 230,
      src: data1,
    },
    {
      _width: 58,
      left: 81,
      top: 169,
      src: data2,
    },
    {
      _width: 35,
      left: 157,
      top: 144,
      src: data3,
    },
    {
      _width: 58,
      left: 223,
      top: 136,
      src: data4,
    },
    {
      _width: 35,
      left: 299,
      top: 118,
      src: data5,
    },
  ],
  nations: [
    {
      _width: 58,
      left: 8,
      top: 289,
      src: text1,
    },
    {
      _width: 40,
      left: 89,
      top: 289,
      src: text2,
    },
    {
      _width: 58,
      left: 151,
      top: 289,
      src: text3,
    },
    {
      _width: 40,
      left: 231,
      top: 289,
      src: text4,
    },
    {
      _width: 40,
      left: 300,
      top: 289,
      src: text5,
    },
  ],
}

const StyledBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const StyledCloth = styled.img`
  position: absolute;
  width: ${(58 / mockup.animationBlock.width) * 100}%;
  left: ${props => (props.left / mockup.animationBlock.width) * 100}%;
  top: ${props => (props.top / mockup.animationBlock.height) * 100}%;
  z-index: 100;
`

class Area2 extends React.PureComponent {
  _renderNations(blocks, duration = 0, delay = 500) {
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

  _renderNumbers(blocks, duration = 0, delay = 500) {
    return this._renderNations(blocks, duration, delay)
  }

  _renderDiapers(blocks, duration = 0, delay = 500) {
    return blocks.map((block) => {
      return this._renderDiapersColumn(block, duration, delay)
    })
  }

  _renderDiapersColumn(column, duration = 0, delay = 500) {
    const partialDur = duration / column.amount
    const blocks = []
    for (let i = 0; i < column.amount; i += 1) {
      // 8 is diaper distance
      blocks.push(Object.assign({}, column, { top: column.top + (i * 8) }))
    }

    return blocks.map((block, index) => {
      return (
        <StyledSlideDownAnimatedBlocks
          animationBlock={mockup.animationBlock}
          duration={partialDur}
          delay={(index * partialDur) + delay}
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          zIndex={blocks.length - index}
          _width={34}
          {...block}
        />
      )
    })
  }

  _renderClothes() {
    return mockup.clothes.map((_cloth, index) => {
      return (
        <StyledCloth
          key={`${_cloth.src}_${index}`}
          {..._cloth}
        />
      )
    })
  }

  render() {
    const durations = {
      nations: 300,
      diapers: 500,
      numbers: 300,
      offset: 300,
    }
    return (
      <React.Fragment>
        <StyledBackground
          src={bg}
        />
        {this._renderDiapers(mockup.diapers, durations.diapers, durations.nations + durations.offset)}
        {this._renderClothes()}
        {this._renderNations(mockup.nations, durations.nations, 0)}
        {this._renderNumbers(mockup.numbers, durations.numbers, durations.nations + durations.diapers + (durations.offset * 2))}
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area2)
