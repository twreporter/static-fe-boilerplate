import D3Link from './d3-link'
import givenRanking from '../../../data/ranking'
import PropTypes from 'prop-types'
import { styleConstants as playerStyle } from './ranked-player'
import React, { Component } from 'react'
import styled from 'styled-components'
// lodash
import findIndex from 'lodash/findIndex'
import map from 'lodash/map'

const _ = {
  map,
  findIndex,
}

export const styleConstants = {
  strokeColors: {
    // up: '#ffffff',
    // equal: '#F5C651',
    // down: '#000000',
    // equal: '#F5C651',
    hit: '#ffffff',
    notHit: '#000000',
  },
  strokeOpacity: {
    // up: '0.6',
    // equal: '0.3',
    // down: '0.3',
    hit: '0.6',
    notHit: '0.3',
  },
  strokeWidth: '5px',
}

const Container = styled.div.attrs({
  style: ({ svgWidth }) => {
    return ({
      width: `${svgWidth}px`,
    })
  },
})`
  flex: 1 1 auto;
  height: ${props => props.svgHeight}px;
`

export default class ResponsiveSvg extends Component {
  static propTypes = {
    svgHeight: PropTypes.number.isRequired,
    userRanking: PropTypes.arrayOf(PropTypes.string).isRequired,
  }
  constructor(props) {
    super(props)
    this.state = {
      svgWidth: 0,
    }
    this._svgWrapper = null
    this._cachedUserRanking = {
      original: null,
      reversed: null,
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this._handleResize)
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this._handleResize)
    }
  }

  // _selectStrokeColor(pathCoordinates) {
  //   const startY = pathCoordinates.start.y
  //   const endY = pathCoordinates.end.y
  //   let lineTrend = 'equal'
  //   if (startY < endY) {
  //     lineTrend = 'down'
  //   } else if (startY > endY) {
  //     lineTrend = 'up'
  //   }
  //   return styleConstants.strokeColors[lineTrend]
  // }

  // _selectStrokeOpacity(pathCoordinates) {
  //   const startY = pathCoordinates.start.y
  //   const endY = pathCoordinates.end.y
  //   let lineTrend = 'equal'
  //   if (startY < endY) {
  //     lineTrend = 'down'
  //   } else if (startY > endY) {
  //     lineTrend = 'up'
  //   }
  //   return styleConstants.strokeOpacity[lineTrend]
  // }

  _buildPath(playerId) {
    const pathCoordinates = this._getPathCoordinates(playerId)
    const rank = _.findIndex(givenRanking, (player => player === playerId))
    const strokeColor = rank <= 4 ? styleConstants.strokeColors.hit : styleConstants.strokeColors.notHit
    const strokeOpacity = rank <= 4 ? styleConstants.strokeOpacity.hit : styleConstants.strokeOpacity.notHit
    return (
      <D3Link
        withAnimation
        key={`link-${playerId}`}
        className="slope-graph-link"
        pathCoordinates={pathCoordinates}
        stroke={strokeColor}
        strokeWidth={styleConstants.strokeWidth}
        opacity={strokeOpacity}
      />
    )
  }

  _calculateLineY(ranking, playerId) {
    const rank = _.findIndex(ranking, (player => player === playerId))
    return Math.round((rank * playerStyle.playerHeight) + (rank * playerStyle.playerMargin) + (0.5 * playerStyle.avatarSize))
  }

  _getPathCoordinates(playerId) {
    const { userRanking } = this.props
    return {
      start: {
        x: 0,
        y: this._calculateLineY(userRanking, playerId),
      },
      end: {
        x: this.state.svgWidth,
        y: this._calculateLineY(givenRanking, playerId),
      },
    }
  }

  _pureReverse(array) {
    const newArray = []
    for (let i = array.length; i >= 0; i -= 1) {
      newArray.push(array[i])
    }
    return newArray
  }

  _getSvgWrapper = (ele) => {
    this._svgWrapper = ele
    if (ele && ele.offsetWidth) {
      const { offsetWidth } = ele
      this._setSvgWidth(offsetWidth)
    }
  }

  _handleResize = () => {
    const svgWrapper = this._svgWrapper
    const { offsetWidth } = svgWrapper
    this._setSvgWidth(offsetWidth)
  }

  _setSvgWidth(width) {
    this.setState(({ svgWidth }) => ({
      svgWidth: width || svgWidth,
    }))
  }

  render() {
    const { svgHeight, userRanking, ...elseProps } = this.props
    const { svgWidth } = this.state
    if (this._cachedUserRanking.original !== userRanking) {
      this._cachedUserRanking.original = userRanking
      this._cachedUserRanking.reversed = this._pureReverse(userRanking)
    }
    const reversedUserRanking = this._cachedUserRanking.reversed
    return (
      <Container innerRef={this._getSvgWrapper} svgWidth={svgWidth} svgHeight={svgHeight} >
        <svg width="100%" height={svgHeight} {...elseProps} >
          {_.map(reversedUserRanking, playerId => this._buildPath(playerId))}
        </svg>
      </Container>
    )
  }
}
