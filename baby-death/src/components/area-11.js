/* eslint react/no-array-index-key:0 */
import React from 'react'
import bg from '../../static/area-11/a11-bg.png'
import numberHeader from '../../static/area-11/a11-number.png'
import number1 from '../../static/area-11/a11-number-1.png'
import number2 from '../../static/area-11/a11-number-2.png'
import number3 from '../../static/area-11/a11-number-3.png'
import number4 from '../../static/area-11/a11-number-4.png'
import number5 from '../../static/area-11/a11-number-5.png'
import rankHeader from '../../static/area-11/a11-rank.png'
import rank1 from '../../static/area-11/a11-rank-1.png'
import rank2 from '../../static/area-11/a11-rank-2.png'
import rank3 from '../../static/area-11/a11-rank-3.png'
import rank4 from '../../static/area-11/a11-rank-4.png'
import rank5 from '../../static/area-11/a11-rank-5.png'
import reusedComponents from './reused-components'
import styled from 'styled-components'
import withAreaWrapper from './area-wrapper'

const { StyledScaleAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 318,
    height: 465,
  },
  ranks: [
    {
      left: 12,
      top: 237,
      src: rank1,
    },
    {
      left: 12,
      top: 272,
      src: rank2,
    },
    {
      left: 12,
      top: 307,
      src: rank3,
    },
    {
      left: 12,
      top: 342,
      src: rank4,
    },
    {
      left: 12,
      top: 377,
      src: rank5,
    },
  ],
  bars: [
    {
      _width: 37,
      left: 88,
      top: 237,
    },
    {
      _width: 0,
      left: 88,
      top: 272,
    },
    {
      _width: 0,
      left: 88,
      top: 307,
    },
    {
      _width: 77,
      left: 88,
      top: 342,
    },
    {
      _width: 170,
      left: 88,
      top: 377,
    },
  ],
  numbers: [
    {
      _width: 28,
      left: 130,
      top: 237,
      src: number1,
    },
    {
      _width: 28,
      left: 112,
      top: 272,
      src: number2,
    },
    {
      _width: 28,
      left: 112,
      top: 307,
      src: number3,
    },
    {
      _width: 137,
      left: 170,
      top: 344,
      src: number4,
    },
    {
      _width: 43,
      left: 264,
      top: 382,
      src: number5,
    },
  ],
}

const durations = {
  ranks: 300,
  bars: 500,
  numbers: 500,
}

const Background = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const StyledRankHeader = styled.img`
  position: absolute;
  width: ${95 / mockup.animationBlock.width * 100}%;
  left: ${12 / mockup.animationBlock.width * 100}%;
  top: ${177 / mockup.animationBlock.height * 100}%;
`

const StyledNumberHeader = styled.img`
  position: absolute;
  width: ${219 / mockup.animationBlock.width * 100}%;
  left: ${88 / mockup.animationBlock.width * 100}%;
  top: ${177 / mockup.animationBlock.height * 100}%;
`

const StyledAnimatedBar = styled.div`
  position: absolute;
  will-change: width;
  width: ${props => (props.toShow ? (props._width / mockup.animationBlock.width) * 100 : '0')}%;
  transition: width ${durations.bars}ms linear ${props => props.delay}ms;
  height: ${30 / mockup.animationBlock.height * 100}%;
  left: ${props => props.left / mockup.animationBlock.width * 100}%;
  top: ${props => props.top / mockup.animationBlock.height * 100}%;
  border-radius: 5px;
  border: 3px solid #fff;
  background-color: #94bcb8;
`

class Area11 extends React.Component {
  _renderHeader() {
    return (
      <React.Fragment>
        <StyledNumberHeader
          src={numberHeader}
        />
        <StyledRankHeader
          src={rankHeader}
        />
      </React.Fragment>
    )
  }

  _renderRanks(blocks, duration = 0, delay = 500) {
    const partialDur = duration / blocks.length
    return blocks.map((block, index) => {
      return (
        <StyledScaleAnimatedBlock
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          duration={partialDur}
          delay={(index * partialDur) + delay}
          animationBlock={mockup.animationBlock}
          _width={95}
          {...block}
        />
      )
    })
  }

  _renderBars(blocks, duration, delay = 500) {
    const partialDur = duration / blocks.length
    return blocks.map((block, index) => {
      return (
        <StyledAnimatedBar
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          duration={partialDur}
          delay={(index * partialDur) + delay}
          {...block}
        />
      )
    })
  }

  _renderNumbers(blocks, duration = 0, delay = 500) {
    return blocks.map((block, index) => {
      return (
        <StyledScaleAnimatedBlock
          key={`${block.src}_${index}`}
          toShow={this.props.toAnimate}
          duration={duration}
          delay={delay}
          animationBlock={mockup.animationBlock}
          {...block}
        />
      )
    })
  }

  render() {
    const _durations = {
      ranks: durations.ranks * mockup.ranks.length,
      bars: durations.bars * mockup.bars.length,
      numbers: durations.numbers,
    }
    return (
      <React.Fragment>
        <Background src={bg} />
        {this._renderHeader()}
        {this._renderBars(mockup.bars, _durations.bars, _durations.ranks)}
        {this._renderRanks(mockup.ranks, _durations.ranks, 0)}
        {this._renderNumbers(mockup.numbers, _durations.numbers, _durations.ranks + _durations.bars)}
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area11)
