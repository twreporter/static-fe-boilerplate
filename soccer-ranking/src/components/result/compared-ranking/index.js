import { rankingWithIndexId } from '../ranking-with-index'
import { resultLevelUrls } from '../../../constants/result-level-paths'
import Level from './level'
import LinkButton, { Button } from '../../link-button'
import PropTypes from 'prop-types'
import ranking from '../../../data/ranking'
import React, { PureComponent } from 'react'
import routes from '../../routes'
import SlopeChart from './slope-chart'
import smoothScroll from 'smoothscroll'
import styled from 'styled-components'
import { buildFbShareLink } from '../../../utils/build-fb-share-link'
// lodash
import difference from 'lodash/difference'

const _ = {
  difference,
}

const top5 = ranking.slice(0, 5)

const text = {
  shareButton: '分享測驗結果',
  replayButton: '再玩一次！',
  toDetail: '看球員排名解析',
}

const Container = styled.div`
  padding-bottom: 40px;
`

const HrefButton = Button.withComponent('a').extend`
  display: block;
  &:link {
    text-decoration: none !important;
  }
`

export default class ComparedRanking extends PureComponent {
  static propTypes = {
    userRanking: PropTypes.array,
    goTo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    userRanking: [],
  }

  _checkIfRankNotMatch(userRank, index) {
    return userRank !== top5[index]
  }

  _getUserLevel(hitsCount, allRight) {
    if (hitsCount <= 1) {
      return 0
    } else if (hitsCount <= 3) {
      return 1
    } else if (!allRight) {
      return 2
    }
    return 3
  }

  _goToRankingWithIndex() {
    if (typeof document !== 'undefined') {
      return smoothScroll(document.getElementById(rankingWithIndexId))
    }
  }

  render() {
    const { userRanking, goTo } = this.props
    const hitsCount = userRanking.length - _.difference(userRanking, top5).length
    let allRight = false
    if (hitsCount === userRanking.length) {
      allRight = !userRanking.some(this._checkIfRankNotMatch)
    }
    const userLevel = this._getUserLevel(hitsCount, allRight)
    return (
      <Container>
        <SlopeChart userRanking={userRanking} />
        <Level userLevel={userLevel} hitsCount={hitsCount} />
        <HrefButton href={buildFbShareLink(resultLevelUrls[userLevel])} target="_blank" rel="noopener noreferrer" bgColor="#f0932a" bgActiveColor="#d1760f">{text.shareButton}</HrefButton>
        <LinkButton bgColor="#f5c551" bgActiveColor="#da9e0d" to={routes.home.path} goTo={goTo}>{text.replayButton}</LinkButton>
        <Button bgColor="#8acbd7" bgActiveColor="#3995a7" onClick={this._goToRankingWithIndex}>{text.toDetail}</Button>
      </Container>
    )
  }
}
