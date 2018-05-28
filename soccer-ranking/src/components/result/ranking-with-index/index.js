import { fontWeight } from '../../../constants/style'
import { icon } from '../../../constants/image-paths'
import map from 'lodash/map'
import playersData from '../../../data/players'
import ranking from '../../../data/ranking'
import RankWithIndex from './rank'
import React, { PureComponent } from 'react'
import SectionTitle from '../section-title'
import styled from 'styled-components'
import mq from '../../../utils/media-query'

export const rankingWithIndexId = 'ranking-with-index'

const _ = {
  map,
}

const Container = styled.section`
  background-color: #124810;
`

const Content = styled.div`
  width: 90%;
  min-width: 310px;
  max-width: 500px;
  padding: 31px 0 25px 0;
  ${mq.desktopAbove`
    padding: 50px 0 45px 0;
  `}
  margin: 0 auto;
`

const Text = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  line-height: 1.67;
  text-align: justify;
  color: #ffffff;
  >p {
    margin: 0 0 .5em 0;
  }
`

const Legends = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
`

const Legend = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.bold};
  line-height: 1.89;
  color: #ffffff;
`

const Comment = styled.div`
  opacity: 0.6;
  font-weight: ${fontWeight.regular};
  font-size: 16px;
  line-height: 1.5;
  text-align: justify;
  color: #ffffff;
  margin-bottom: .5em;
  >a {
    color: #ffffff !important;
  }
`

const Icon = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-right: .5em;
`

const Ranking = styled.div`
  margin-top: 50px;
`

export default class RankingWithIndex extends PureComponent {
  render() {
    return (
      <Container id={rankingWithIndexId}>
        <Content>
          <SectionTitle>分數指標</SectionTitle>
          <Text>
            <p>《報導者》團隊先挑選出 10 位 21 世紀超級球星。根據專家意見，將世界盃團體及個人成績做為指標，加權總和評分。</p>
            <p>指標與加權方式分別為：</p>
          </Text>
          <Legends>
            <Legend>
              <Icon image={icon.champion} />代表國家奪冠次數：40%
            </Legend>
            <Legend>
              <Icon image={icon.shot} />個人世界盃會內賽累積進球數：20%
            </Legend>
            <Legend>
              <Icon image={icon.award} />世界盃個人獎項次數：20%
            </Legend>
            <Legend>
              <Icon image={icon.worldcup} />世足賽參賽次數：10%
            </Legend>
            <Legend>
              <Icon image={icon.quarterfinal} />代表國家闖入世界盃 8 強次數：10%
            </Legend>
          </Legends>
          <Comment>註1：每項指標以 10 大球星中該項最高分為滿分，按比例計算得分後加權。</Comment>
          <Comment>註2：2018 年俄羅斯世界盃並未列入計算</Comment>
          <Comment>註3：詳細資料請見
            <a href="https://docs.google.com/spreadsheets/d/1HyIPQJStYb6QW4R3MInpDrHkh5k-R4-VA_qu3Y9VGzk/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <span>「《報導者》「世足球星誰稱王」測驗－球員數據表」</span>
            </a>
          </Comment>
          <Ranking>
            {_.map(ranking, (playerId, index) => {
              const data = playersData[playerId]
              return (
                <RankWithIndex
                  key={playerId}
                  name={data.name}
                  nation={data.nation}
                  image={data.image}
                  rank={index + 1}
                  awardCount={data.awardCount}
                  championCount={data.championCount}
                  quarterfinalCount={data.quarterfinalCount}
                  shotCount={data.shotCount}
                  worldcupCount={data.worldcupCount}
                  review={data.review}
                />
              )
            })}
          </Ranking>
        </Content>
      </Container>
    )
  }
}
