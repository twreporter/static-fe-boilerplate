import mq, { breakPoints } from '../../utils/media-query'
import { colors } from '../../constants/style'
import ArrowSvg from '../../../static/icon/arrow-down.svg'
import Banner from './banner'
import LinkButton from '../link-button'
import playersData from '../../data/players'
import PropTypes from 'prop-types'
import RankingArea from './ranking-area'
import React, { PureComponent } from 'react'
import routes from '../routes'
import styled, { keyframes } from 'styled-components'
import WaitingArea from './waiting-area'
// lodash
import findIndex from 'lodash/findIndex'
import map from 'lodash/map'
import shuffle from 'lodash/shuffle'

const _ = {
  findIndex,
  map,
  shuffle,
}

const translateOffset = 22
const bounce = keyframes`
 from {
  transform: translateY(0);
  opacity: 0;
 }
 45% {
  opacity: 0;
 }
 50% {
  opacity: 1;
 }
 55% {
  transform: translateY(0);
 }
 60% {
  transform: translateY(${translateOffset}px);
 }
 65% {
  transform: translateY(0);
 }
 70% {
  transform: translateY(${translateOffset}px);
 }
 75% {
  transform: translateY(0);
  opacity: 1;
 }
 85% {
  opacity: 0;
 }
 100% {
  opacity: 0;
  transform: translateY(0);
 }
`

const text = {
  submitButton: {
    disable: '請選滿前五名球員',
    submit: '揭曉榜單結果',
  },
}

const playerIds = _.shuffle(_.map(playersData, player => player.id))

const ArrowDown = styled.div`
  display: ${props => (props.showScrollHint ? 'block' : 'none')};
  ${mq.miniOnly`
    animation: ${bounce} 5200ms ease 5000ms both infinite;
    width: 27px;
    height: 26px;
    position: fixed;
    bottom: 30px;
    right: 20px;
  `}
  ${mq.mobileAbove`
    display: none;
  `}
`

const Container = styled.div`
  background-color: ${colors.selectionBg};
  position: relative;
  width: 100%;
`

export default class Selection extends PureComponent {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
    tempRanking: PropTypes.array,
  }

  static defaultProps = {
    tempRanking: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      ranking: props.tempRanking || ['', '', '', '', ''],
      waitingFocusStartAt: 0,
      showScrollHint: true,
    }
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= breakPoints.mini.max) {
        window.addEventListener('scroll', this._handleScroll)
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this._handleScroll)
    }
  }

  _handleScroll = () => {
    if ((window.innerHeight + window.scrollY) >= 680) {
      window.removeEventListener('scroll', this._handleScroll)
      return this.setState({
        showScrollHint: false,
      })
    }
  }

  _pureUpdatePlayerToRanking = (playerId, toRank) => {
    this.setState(({ ranking, waitingFocusStartAt }) => {
      // 1. build new ranking
      const newRanking = []
      ranking.forEach((prevPlayer, index) => {
        if (index === toRank) {
          // update previousRanking[toRank] with playerId
          newRanking.push(playerId)
        } else if (prevPlayer === playerId) {
          const previousPlayerAtTargetPosition = ranking[toRank]
          newRanking.push(previousPlayerAtTargetPosition)
        } else {
          // do nothing with else elements
          newRanking.push(prevPlayer)
        }
      })
      // 2. Keep the user focus on the player focused before setState (if she/he stills in waiting)
      const currentFocusStartPlayerId = this._getWaiting(ranking)[waitingFocusStartAt]
      const newWaiting = this._getWaiting(newRanking)
      const focusedPlayerInNewWaiting = _.findIndex(newWaiting, player => player === currentFocusStartPlayerId)
      return ({
        ranking: newRanking,
        waitingFocusStartAt: focusedPlayerInNewWaiting > -1 ? focusedPlayerInNewWaiting : waitingFocusStartAt,
      })
    })
  }

  _setWaitingFocusStartAt = (index) => {
    this.setState({
      waitingFocusStartAt: index,
    })
  }

  _checkIfPlayerInRanking = (playerId, ranking) => {
    return ranking.some(rankedPlayer => rankedPlayer === playerId)
  }

  _getWaiting(playersInRanking) {
    return playerIds.filter(player => !this._checkIfPlayerInRanking(player, playersInRanking)) // Players not in ranking are in waiting
  }

  render() {
    const { goTo } = this.props
    const { ranking, waitingFocusStartAt, showScrollHint } = this.state
    const waiting = this._getWaiting(ranking)
    const notFullSelected = ranking.some(player => !player)
    return (
      <Container>
        <Banner goTo={goTo} tempRanking={ranking} />
        <RankingArea
          ranking={ranking}
          updateRank={this._pureUpdatePlayerToRanking}
        />
        <WaitingArea
          waiting={waiting}
          focusStartAt={waitingFocusStartAt}
          setFocusStartAt={this._setWaitingFocusStartAt}
          updateRank={this._pureUpdatePlayerToRanking}
        />
        <LinkButton to={routes.result.path} pageProps={{ withSelection: true, userRanking: ranking }} goTo={goTo} disable={notFullSelected}>
          {notFullSelected ? text.submitButton.disable : text.submitButton.submit }
        </LinkButton>
        <ArrowDown showScrollHint={showScrollHint}><ArrowSvg /></ArrowDown>
      </Container>
    )
  }
}
