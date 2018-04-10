import * as d3Ease from 'd3-ease'
import * as d3Interpolate from 'd3-interpolate'
import * as d3Selection from 'd3-selection'
import * as d3Shape from 'd3-shape'
import * as d3Transition from 'd3-transition'
import React from 'react'
import styled from 'styled-components'
import sunflower from '../../static/area-3/a3-bg.png'
import text1 from '../../static/area-3/a3-text-1.png'
import text2 from '../../static/area-3/a3-text-2.png'
import text3 from '../../static/area-3/a3-text-3.png'
import text4 from '../../static/area-3/a3-text-4.png'
import text5 from '../../static/area-3/a3-text-5.png'
import text6 from '../../static/area-3/a3-text-6.png'
import text7 from '../../static/area-3/a3-text-7.png'
import reusedComponents from './reused-components'
import withAreaWrapper from './area-wrapper'
import merge from 'lodash.merge'

const _ = {
  merge,
}

const { StyledScaleAnimatedBlock } = reusedComponents

const d3 = _.merge({}, d3Shape, d3Selection, d3Transition, d3Interpolate, d3Ease)

const duration = 500

const mockup = {
  animationBlock: {
    width: 341,
    height: 417,
  },
  circle: {
    width: 260,
    height: 260,
    radius: 130,
  },
  indicators: [
    {
      _width: 94,
      left: 182,
      top: 183,
      src: text1,
    },
    {
      _width: 76,
      left: 204,
      top: 277,
      src: text2,
    },
    {
      _width: 71,
      left: 106,
      top: 308,
      src: text3,
    },
    {
      _width: 70,
      left: 54,
      top: 246,
      src: text4,
    },
    {
      _width: 86,
      left: 57,
      top: 193,
      src: text5,
    },
    {
      _width: 89,
      left: 108,
      top: 31,
      src: text6,
    },
    {
      _width: 89,
      left: 145,
      top: 57,
      src: text7,
    },
  ],
}

const SunFlower = styled.img`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const PieChart = styled.div`
  position: absolute;
  width: ${(mockup.circle.width / mockup.animationBlock.width) * 100}%;
  height: ${(mockup.circle.height / mockup.animationBlock.height) * 100}%;
  left: ${(40 / mockup.animationBlock.width) * 100}%;
  top: ${(118 / mockup.animationBlock.height) * 100}%;
`

class Area3 extends React.Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this._isAnimated = false
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUpdate() {
    if (this._isMounted && !this._isAnimated) {
      this._isAnimated = true
      this._renderPieChart()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    this._isAnimated = false
  }

  _renderPieChart() {
    const dataset = [
      { name: '周產期相關', percent: 28, color: 'rgb(111,157,210)', stroke: '#fff' },
      { name: '先天畸形', percent: 17, color: 'rgb(111,157,210)', stroke: '#fff' },
      { name: '交通事故', percent: 21, color: 'rgb(233,199,185)', stroke: '#fff' },
      { name: '惡性腫瘤', percent: 12, color: 'rgb(233,199,185)', stroke: '#fff' },
      { name: '其他意外事故', percent: 11, color: 'rgb(233,199,185)', stroke: '#fff' },
      { name: '不明死因', percent: 6, color: 'rgb(233,199,185)', stroke: '#fff' },
      { name: '故意傷害', percent: 5, color: 'rgb(233,199,185)', stroke: '#fff' },
    ]

    const arc = d3.arc()
      .outerRadius(mockup.circle.radius)
      .innerRadius(0)

    const pie = d3.pie()
      .sort(null)
      .value((d) => { return d.percent })

    const svg = d3.select('#piechart')
    const arcs = svg.append('g')
      .attr('transform', `translate(${mockup.circle.width / 2},${mockup.circle.height / 2})`)
      .selectAll('g.arc')
      .data(pie(dataset))
      .enter()
      .append('g')
      .attr('class', 'arc')

    arcs.append('path')
      .style('fill', (d) => { return d.data.color })
      .style('stroke', (d) => { return d.data.stroke })
      .transition()
      .ease(d3.easeExpOut)
      .delay((d, i) => {
        return (i * duration) + duration
      })
      .duration(duration)
      .attrTween('d', (d) => {
        const _d = d
        const i = d3.interpolate(d.startAngle + 0.1, d.endAngle)
        return function (t) {
          _d.endAngle = i(t)
          return arc(_d)
        }
      })
  }

  _renderIndicators() {
    return mockup.indicators.map((indicator, index) => {
      return (
        <StyledScaleAnimatedBlock
          key={indicator.src}
          animationBlock={mockup.animationBlock}
          toShow={this._isAnimated}
          duration={300}
          delay={(index + 1) * duration}
          {...indicator}
        />
      )
    })
  }

  _onEnter() {
  }

  render() {
    const indicatorsJSX = this._renderIndicators()
    return (
      <React.Fragment>
        <SunFlower src={sunflower} />
        <PieChart>
          <svg id="piechart" viewBox={`0 0 ${mockup.circle.width} ${mockup.circle.height}`} width="100%" height="100%" />
        </PieChart>
        {indicatorsJSX}
      </React.Fragment>
    )
  }
}

export default withAreaWrapper(mockup.animationBlock, Area3)
