import React from 'react'
import body1 from '../../static/area-4/a4-2.png'
import body2 from '../../static/area-4/a4-3.png'
import body3 from '../../static/area-4/a4-4.png'
import body4 from '../../static/area-4/a4-5.png'
import foot from '../../static/area-4/a4-1.png'
import hand from '../../static/area-4/a4-7.png'
import head from '../../static/area-4/a4-6.png'
import withAreaWrapper from './area-wrapper'
import reusedComponents from './reused-components'

const { StyledSlideDownAnimatedBlocks } = reusedComponents

const mockup = {
  animationBlock: {
    width: 345,
    height: 410,
  },
  bodys: [
    {
      _width: 207,
      left: 81,
      top: 255,
      src: body1,
    },
    {
      _width: 207,
      left: 81,
      top: 213,
      src: body2,
    },
    {
      _width: 207,
      left: 81,
      top: 161,
      src: body3,
    },
    {
      _width: 207,
      left: 81,
      top: 68,
      src: body4,
    },
  ],
}

class Area4 extends React.PureComponent {
  _renderBodys(duration) {
    const partialDur = duration / mockup.bodys.length
    return mockup.bodys.map((body, index) => {
      return (
        <StyledSlideDownAnimatedBlocks
          key={body.src}
          animationBlock={mockup.animationBlock}
          toShow={this.props.toAnimate}
          duration={partialDur}
          delay={(index + 1) * partialDur}
          {...body}
        />
      )
    })
  }

  render() {
    const duration = 1600
    const bodysJSX = this._renderBodys(duration)
    return (
      <React.Fragment>
        <StyledSlideDownAnimatedBlocks
          _width={mockup.animationBlock.width}
          animationBlock={mockup.animationBlock}
          delay={0}
          duration={300}
          left={0}
          src={foot}
          toShow={this.props.toAnimate}
          top={319}
        />
        <StyledSlideDownAnimatedBlocks
          _width={36}
          animationBlock={mockup.animationBlock}
          delay={1800}
          duration={300}
          left={60}
          src={hand}
          toShow={this.props.toAnimate}
          top={102}
        />
        {bodysJSX}
        <StyledSlideDownAnimatedBlocks
          _width={85}
          animationBlock={mockup.animationBlock}
          delay={1800}
          duration={300}
          left={141}
          src={head}
          toShow={this.props.toAnimate}
          top={20}
        />
        <StyledSlideDownAnimatedBlocks
          _width={36}
          animationBlock={mockup.animationBlock}
          delay={1800}
          duration={300}
          left={265}
          src={hand}
          toShow={this.props.toAnimate}
          top={102}
        />
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area4)
