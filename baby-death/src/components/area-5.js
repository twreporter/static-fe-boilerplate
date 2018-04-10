import Chart from './chart'
import React from 'react'
import bg from '../../static/area-5/a5-bg.png'
import chart from '../../static/area-5/a5-data.png'
import withAreaWrapper from './area-wrapper'

const mockup = {
  animationBlock: {
    width: 362,
    height: 432,
  },
  chartBox: {
    _width: 294,
    _height: 181,
    top: 110,
    left: 44,
  },
}

class Area5 extends React.PureComponent {
  render() {
    return (
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
        direction="up"
      />
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area5)
