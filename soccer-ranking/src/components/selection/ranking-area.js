import playersData from '../../data/players'
import PropTypes from 'prop-types'
import Rank from './rank'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import mq from '../../utils/media-query'

// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const Container = styled.div`
  width: 100%;
  min-width: 320px;
  margin: 0 auto 27px auto;
  display: flex;
  justify-content: center;
  ${mq.miniOnly`
    flex-wrap: wrap;
  `}
`

export default class RankingArea extends PureComponent {
  static propTypes = {
    ranking: PropTypes.arrayOf(PropTypes.string).isRequired,
    updateRank: PropTypes.func.isRequired,
  }

  _buildRank = (playerId, index) => {
    return (
      <Rank
        key={index}
        index={index}
        player={playersData[playerId]}
        updateRank={this.props.updateRank}
      />
    )
  }

  render() {
    const { ranking } = this.props
    return (
      <Container>
        {_.map(ranking, this._buildRank)}
      </Container>
    )
  }
}
