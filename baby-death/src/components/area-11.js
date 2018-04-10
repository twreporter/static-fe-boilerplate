/* eslint react/no-array-index-key:0 */
import Chart from './chart'
import React from 'react'
import bg from '../../static/area-11/a11-bg.png'
import chart from '../../static/area-11/a11-data-1.png'
import averageLine from '../../static/area-11/a11-data-2.png'
import reusedComponents from './reused-components'
import withAreaWrapper from './area-wrapper'

const { StyledOpacityAnimatedBlock } = reusedComponents

const mockup = {
  animationBlock: {
    width: 318,
    height: 462,
  },
  chartBox: {
    _width: 264,
    _height: 187,
    left: 46,
    top: 218,
  },
  averageLine: {
    _width: 65,
    left: 245,
    top: 219,
  },
}

class Area11 extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Chart
          position={{
            width: `${mockup.chartBox._width / mockup.animationBlock.width * 100}%`,
            height: `${mockup.chartBox._height / mockup.animationBlock.height * 100}%`,
            top: `${mockup.chartBox.top / mockup.animationBlock.height * 100}%`,
            left: `${mockup.chartBox.left / mockup.animationBlock.width * 100}%`,
          }}
          imgs={{
            chart,
            bg,
          }}
          toAnimate={this.props.toAnimate}
        />
        <StyledOpacityAnimatedBlock
          src={averageLine}
          animationBlock={mockup.animationBlock}
          duration={300}
          delay={1000}
          toShow={this.props.toAnimate}
          {...mockup.averageLine}
        />
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area11)
