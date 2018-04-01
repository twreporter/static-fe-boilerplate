import Chart from './chart'
import React from 'react'
import bg from '../../static/area-1/a1-bg.png'
import chart from '../../static/area-1/a1-data.png'
import withAreaWrapper from './area-wrapper'

const mockup = {
  animationBlock: {
    width: 346,
    height: 398,
  },
  chartBox: {
    _width: 266,
    _height: 230,
    left: 55,
    top: 110,
  },
}

class Area1 extends React.PureComponent {
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
      />
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area1)
