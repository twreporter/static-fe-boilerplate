import React from 'react'
import district_2011_1 from '../../static/area-8/a8-2011-1.png'
import district_2011_2 from '../../static/area-8/a8-2011-2.png'
import district_2011_3 from '../../static/area-8/a8-2011-3.png'
import district_2011_4 from '../../static/area-8/a8-2011-4.png'
import district_2011_5 from '../../static/area-8/a8-2011-5.png'
import district_2011_6 from '../../static/area-8/a8-2011-6.png'
import district_2015_1 from '../../static/area-8/a8-2015-1.png'
import district_2015_2 from '../../static/area-8/a8-2015-2.png'
import district_2015_3 from '../../static/area-8/a8-2015-3.png'
import district_2015_4 from '../../static/area-8/a8-2015-4.png'
import indicator_2011 from '../../static/area-8/a8-text-1.png'
import indicator_2015 from '../../static/area-8/a8-text-2.png'
import map from '../../static/area-8/a8-bg.png'
import reusedComponents from './reused-components'
import styled from 'styled-components'
import withAreaWrapper from './area-wrapper'

const { StyledOpacityAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 341,
    height: 371,
  },
  districts: {
    _2011: [
      {
        _width: 59,
        left: 184,
        top: 81,
        src: district_2011_1,
      },
      {
        _width: 54,
        left: 142,
        top: 166,
        src: district_2011_2,
      },
      {
        _width: 64,
        left: 181,
        top: 130,
        src: district_2011_3,
      },
      {
        _width: 68,
        left: 214,
        top: 117,
        src: district_2011_4,
      },
      {
        _width: 71,
        left: 193,
        top: 203,
        src: district_2011_5,
      },
      {
        _width: 46,
        left: 164,
        top: 254,
        src: district_2011_6,
      },
    ],
    _2015: [
      {
        _width: 17,
        left: 269,
        top: 42,
        src: district_2015_1,
      },
      {
        _width: 59,
        left: 241,
        top: 60,
        src: district_2015_2,
      },
      {
        _width: 37,
        left: 153,
        top: 132,
        src: district_2015_3,
      },
      {
        _width: 71,
        left: 134,
        top: 185,
        src: district_2015_4,
      },
    ],
  },
}

const StyledMap = styled.img`
  position: absolute;
  width: 100%;
`

class Area8 extends React.PureComponent {
  _renderDistricts(districts, duration, delay = 0) {
    return districts.map((district) => {
      return (
        <StyledOpacityAnimatedBlock
          key={district.src}
          toShow={this.props.toAnimate}
          duration={duration}
          delay={delay}
          animationBlock={mockup.animationBlock}
          {...district}
        />
      )
    })
  }

  render() {
    const durations = {
      indicator: 300,
      _2011: 500,
      _2015: 500,
      offset: 200,
    }
    const districts2011JSX = this._renderDistricts(mockup.districts._2011, durations._2011, durations.indicator + durations.offset)
    const districts2015JSX = this._renderDistricts(mockup.districts._2015, durations._2015, (durations.indicator * 2) + (durations.offset * 2) + durations._2011)
    return (
      <React.Fragment>
        <StyledMap
          src={map}
        />
        <StyledOpacityAnimatedBlock
          toShow={this.props.toAnimate}
          delay={0}
          duration={durations.indicator}
          src={indicator_2011}
          _width={170}
          left={30}
          top={30}
          animationBlock={mockup.animationBlock}
        />
        <StyledOpacityAnimatedBlock
          toShow={this.props.toAnimate}
          delay={durations.indicator + durations._2011 + durations.offset}
          duration={durations._2015}
          src={indicator_2015}
          _width={150}
          left={30}
          top={60}
          animationBlock={mockup.animationBlock}
        />
        {districts2011JSX}
        {districts2015JSX}
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area8)
