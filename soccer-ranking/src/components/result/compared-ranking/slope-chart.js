import givenRanking from '../../../data/ranking'
import Player, { styleConstants as playerStyle } from './ranked-player'
import playersData from '../../../data/players'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ResponsiveSvg from './responsive-svg'
import styled from 'styled-components'
import { fontWeight } from '../../../constants/style'
// lodash
import map from 'lodash/map'

const top5 = givenRanking.slice(0, 5)

const _ = {
  map,
}

const text = {
  myRanking: '我的排名',
  actualRanking: '實際排名',
}

const Container = styled.div`
  max-width: 550px;
  min-width: 320px;
  width: 95%;
  margin: 0 auto;
`

const ChartContent = styled.div`
  display: flex;
  width: 100%;
`

const ChartTitle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 15px auto;
`

const Title = styled.div`
  width: 120px;
  height: 45px;
  line-height: 38px;
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  text-align: center;
  color: #000000;
  background-color: #ffffff;
  border: solid 3px #000000;
`

const Players = styled.div`
  width: ${playerStyle.playerWidth}px;
  flex: 0 0 ${playerStyle.playerWidth}px;
  display: flex;
  flex-direction: column;
`

export default class SlopeChart extends PureComponent {
  static propTypes = {
    userRanking: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    userRanking: [],
  }

  _buildPlayers(idList, isGiven = false) {
    if (isGiven) {
      return (
        <Players>
          {_.map(idList, (playerId, i) => {
            const playerData = playersData[playerId]
            return (
              <Player
                key={playerId}
                image={playerData.image}
                name={playerData.name}
                rank={i + 1}
                revert
              />
            )
          })}
        </Players>
      )
    }
    return (
      <Players>
        {_.map(idList, (playerId, i) => {
          const playerData = playersData[playerId]
          const isTop5 = top5.some(topPlayer => (topPlayer === playerId))
          return (
            <Player
              key={playerId}
              image={playerData.image}
              name={playerData.name}
              rank={i + 1}
              isTop5={isTop5}
            />
          )
        })}
      </Players>
    )
  }

  render() {
    const { userRanking } = this.props
    return (
      <Container>
        <ChartTitle>
          <Title>{text.myRanking}</Title>
          <Title>{text.actualRanking}</Title>
        </ChartTitle>
        <ChartContent>
          {this._buildPlayers(userRanking)}
          <ResponsiveSvg
            svgHeight={(playerStyle.playerHeight + playerStyle.playerMargin) * 10}
            userRanking={userRanking}
          />
          {this._buildPlayers(givenRanking, true)}
        </ChartContent>
      </Container>
    )
  }
}
