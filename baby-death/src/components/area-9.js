import React from 'react'
import baby from '../../static/area-9/a9-baby.png'
import reusedComponents from './reused-components'
import twDoctor from '../../static/area-9/a9-tw.png'
import twText from '../../static/area-9/a9-tw-text.png'
import usDoctor from '../../static/area-9/a9-us.png'
import usText from '../../static/area-9/a9-us-text.png'
import withAreaWrapper from './area-wrapper'

const { StyledScaleAnimatedBlock,
  StyledOpacityAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 375,
    height: 370,
  },
  baby: {
    _width: 179,
    left: 104,
    top: 109,
    src: baby,
  },
  doctor: {
    tw: {
      _width: 55,
      left: 54,
      top: 137,
      src: twDoctor,
    },
    us: {
      _width: 157,
      left: 166,
      top: 20,
      src: usDoctor,
    },
  },
  text: {
    tw: {
      _width: 70,
      left: 15,
      top: 182,
      src: twText,
    },
    us: {
      _width: 70,
      left: 295,
      top: 78,
      src: usText,
    },
  },
}

class Area9 extends React.PureComponent {
  _renderDistricts(districts, duration, delay = 0) {
    const partialDur = duration / districts.length
    return districts.map((district, index) => {
      return (
        <StyledOpacityAnimatedBlock
          key={district.src}
          toShow={this.props.toAnimate}
          duration={partialDur}
          delay={(index * partialDur) + delay}
          animationBlock={mockup.animationBlock}
          {...district}
        />
      )
    })
  }

  render() {
    const durations = {
      inital: 300,
      baby: 500,
      doctor: 1000,
      text: 500,
    }
    return (
      <React.Fragment>
        <StyledScaleAnimatedBlock
          animationBlock={mockup.animationBlock}
          duration={durations.doctor}
          delay={durations.inital + durations.baby}
          toShow={this.props.toAnimate}
          {...mockup.doctor.us}
        />
        <StyledScaleAnimatedBlock
          animationBlock={mockup.animationBlock}
          duration={durations.text}
          delay={durations.inital + durations.baby + durations.doctor}
          toShow={this.props.toAnimate}
          {...mockup.text.us}
        />
        <StyledScaleAnimatedBlock
          animationBlock={mockup.animationBlock}
          duration={durations.doctor}
          delay={durations.inital + durations.baby + durations.doctor + durations.text}
          toShow={this.props.toAnimate}
          {...mockup.doctor.tw}
        />
        <StyledScaleAnimatedBlock
          animationBlock={mockup.animationBlock}
          duration={durations.text}
          delay={durations.inital + durations.baby + (durations.doctor * 2) + durations.text}
          toShow={this.props.toAnimate}
          {...mockup.text.tw}
        />
        <StyledOpacityAnimatedBlock
          animationBlock={mockup.animationBlock}
          duration={durations.baby}
          delay={durations.inital}
          toShow={this.props.toAnimate}
          {...mockup.baby}
        />
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area9)
