import { buildFbShareLink } from '../../utils/build-fb-share-link'
import { fontWeight } from '../../constants/style'
import { medalS } from '../../constants/image-paths'
import { ogUrl } from '../../constants/metadata'
import { rankingWithIndexId } from './ranking-with-index'
import LinkButton, { Button } from '../link-button'
import mq from '../../utils/media-query'
import playersData from '../../data/players'
import PropTypes from 'prop-types'
import ranking from '../../data/ranking'
import React, { PureComponent } from 'react'
import routes from '../routes'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
// lodash
import map from 'lodash/map'

const verticalRanking = []
for (let i = 0; i < ranking.length / 2; i += 1) {
  verticalRanking.push({ id: ranking[i], rank: i })
  verticalRanking.push({ id: ranking[Math.floor(ranking.length / 2) + i], rank: Math.floor(ranking.length / 2) + i })
}

const _ = {
  map,
}

const text = {
  shareButton: '分享遊戲到臉書',
  replayButton: '我也要玩！',
  toDetail: '看球員排名解析',
}

const style = {
  playerVerticalMargin: 10,
  playerBorder: 4,
  playerHeight: 85,
}

style.avatarSize = Math.round(style.playerHeight * 1.2)

const Container = styled.div`
  margin: 0 auto;
  padding-bottom: 40px;
`

const Ranking = styled.div`
  padding: 16px 0;
  width: 100%;
  min-width: 320px;
  max-width: 515px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`

const Player = styled.div`
  box-sizing: content-box;
  height: ${style.playerHeight}px;
  display: flex;
  flex: 0 0 ${style.playerWidth}px;
  background-color: #ffffff;
  border: solid ${style.playerBorder}px #000000;
  margin: ${style.playerVerticalMargin / 2}px 0;
  background-image: url(${props => props.image});
  background-position: center right ${style.avatarSize / -2}px;
  background-size: ${style.avatarSize}px ${style.avatarSize}px;
  background-repeat: no-repeat;
  width: calc((100% - (${style.playerBorder}px * 4) - 10px) / 2);
  ${mq.mobileOnly`
  width: calc((100% - (${style.playerBorder}px * 4) - 40px) / 2);
  `}
  ${mq.desktopAbove`
  width: calc((100% - (${style.playerBorder}px * 4) - 60px) / 2);
  `}
`

const Rank = styled.div`
  width: 36px;
  flex: 0 0 36px;
  height: 100%;
  background-image: url(${props => medalS[props.rank]});
  background-position: center center;
  background-size: 24px 35px;
  background-repeat: no-repeat;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Name = styled.div`
  font-size: 24px;
  ${mq.miniOnly`
    font-size: 20px;
  `}
  font-weight: ${fontWeight.bold};
  color: #f5c551;
  line-height: 1.4;
  white-space: nowrap;
`

const Nation = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  line-height: 1.2;
  color: #000000;
  white-space: nowrap;
`

const HrefButton = Button.withComponent('a').extend`
  display: block;
  text-decoration: none !important;
  background-color: #f0932a;
  :hover {
    background-color: #d1760f;
  }
`

export default class SimpleRanking extends PureComponent {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
  }
  _buildRank = ({ id, rank }) => {
    const data = playersData[id]
    return (
      <Player key={id} image={data.image}>
        <Rank rank={rank} />
        <Info>
          <Name>{data.name}</Name>
          <Nation>{data.nation}</Nation>
        </Info>
      </Player>
    )
  }

  _goToRankingWithIndex() {
    if (typeof document !== 'undefined') {
      return smoothScroll(document.getElementById(rankingWithIndexId))
    }
  }

  render() {
    const { goTo } = this.props
    return (
      <Container>
        <Ranking>
          {_.map(verticalRanking, this._buildRank)}
        </Ranking>
        <HrefButton href={buildFbShareLink(ogUrl)} target="_blank" rel="noopener noreferrer" bgColor="#f0932a" bgActiveColor="#d1760f">{text.shareButton}</HrefButton>
        <LinkButton bgColor="#f5c551" bgActiveColor="#da9e0d" to={routes.home.path} goTo={goTo}>{text.replayButton}</LinkButton>
        <Button bgColor="#8acbd7" bgActiveColor="#3995a7" onClick={this._goToRankingWithIndex}>{text.toDetail}</Button>
      </Container>
    )
  }
}
