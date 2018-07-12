import { fontWeight } from '../../../constants/style'
import { icon, medalS } from '../../../constants/image-paths'
import mq from '../../../utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { css, keyframes } from 'styled-components'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

const tooltipEffect = keyframes`
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

const Container = styled.div`
  background-color: #8acbd7;
  border: solid 3px #ffffff;
  margin: 0 auto 25px auto;
  ${mq.desktopAbove`
    margin: 0 auto 27px auto;
  `}
  position: relative;
  &::before {
    z-index: 99;
    content: " ";
    position: absolute;
    left: 10px;
    top: -9px;
    width: 23px;
    height: 35px;
    ${mq.desktopAbove`
      left: 10px;
      top: -9px;
      width: 29px;
      height: 42px;
    `}
    background-size: cover;
    display: inline-block;
    background-image: url(${props => medalS[props.rank - 1]}); 
    background-position: center center;
  }
`

const IndexRow = styled.div`
  border-bottom: solid 3px #ffffff;
  height: 120px;
  position: relative;
  display: flex;
  align-items: stretch;
`

const ImageBlock = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 140px;
  flex: 1 0 140px;
  ${mq.miniOnly`
    width: 110px;
    flex: 0 0 110px;
  `}
`

const InfoBlock = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Avatar = styled.div`
  width: 96px;
  height: 96px;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
  background-color: #ffffff;
  border: solid 1px #ffffff;
  border-radius: 50%;
`

const Name = styled.div`
  font-size: 20px;
  font-weight: ${fontWeight.bold};
  color: #ffffff;
  margin-bottom: 6px;
`

const Indexes = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const tooltipCSS = css`
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-width: 4px;
    border-style: solid;
    border-color: transparent;
    border-bottom: 9px solid #000;
    left: 20%;
    z-index: 99;
    animation: ${tooltipEffect} 359ms ease;
  }
  &::before {
    content: attr(data-tooltip);
    position: absolute;
    color: #fff;
    background-color: #000;
    padding: 6px 8px;
    border-radius: 4px;
    white-space: nowrap;
    bottom: -49px;
    right: -45%;
    font-size: 16px;
    z-index: 99;
    animation: ${tooltipEffect} 359ms ease;
  }
`

const Index = styled.div`
  margin-bottom: 6px;
  position: relative;
  cursor: pointer;
  outline: none;
  ${mq.mobileBelow`
    &:focus {
      ${tooltipCSS}
    }
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-tap-highlight-color: transparent;
  `}
  ${mq.desktopAbove`
    &:hover {
      ${tooltipCSS}
    }
  `}
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

const Score = styled.div`
  display: inline-block;
  width: 10px;
  height: 25px;
  margin-right: 12px;
  vertical-align: middle;
  text-align: right;
`

const ReviewBlock = styled.div`
  padding: 20px 25px;
  font-size: 18px;
  font-weight: ${fontWeight.regular};
  line-height: 1.67;
  text-align: justify;
  color: #4e727a;
  >p {
    margin: 0;
    margin-bottom: .4em;
    &:last-child {
      margin: 0;
    }
  }
`

let prevTimer
const focusTime = 1260 // ms

function handleFocus(event) {
  const ele = event.target
  if (ele && typeof window !== 'undefined') {
    if (prevTimer) {
      window.clearTimeout(prevTimer)
    }
    prevTimer = window.setTimeout(() => ele.blur(), focusTime)
  }
}

export default class RankWithIndex extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    nation: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    awardCount: PropTypes.number.isRequired,
    championCount: PropTypes.number.isRequired,
    quarterfinalCount: PropTypes.number.isRequired,
    shotCount: PropTypes.number.isRequired,
    worldcupCount: PropTypes.number.isRequired,
    review: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      iOS: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
    }
  }

  _buildIndex(image, score, tooltip, iOS) {
    if (iOS) {
      return (
        <Index data-tooltip={tooltip} tabIndex="-1" onFocus={handleFocus} >
          <Icon image={image} />
          <Score>{score}</Score>
        </Index>
      )
    }
    return (
      <Index data-tooltip={tooltip} tabIndex="-1" >
        <Icon image={image} />
        <Score>{score}</Score>
      </Index>
    )
  }

  render() {
    const {
      name,
      nation,
      rank,
      image,
      awardCount,
      championCount,
      quarterfinalCount,
      shotCount,
      worldcupCount,
      review,
    } = this.props
    const { iOS } = this.state
    return (
      <Container rank={rank}>
        <IndexRow>
          <ImageBlock>
            <Avatar image={image} />
          </ImageBlock>
          <InfoBlock>
            <Name>{`${name} ／ ${nation}`}</Name>
            <Indexes>
              {this._buildIndex(icon.champion, championCount, '代表國家奪冠次數', iOS)}
              {this._buildIndex(icon.shot, shotCount, '個人世界盃會內賽累積進球數', iOS)}
              {this._buildIndex(icon.award, awardCount, '個人獎項次數', iOS)}
              {this._buildIndex(icon.worldcup, worldcupCount, '世足賽參賽次數', iOS)}
              {this._buildIndex(icon.quarterfinal, quarterfinalCount, '代表國家闖入世界盃8強次數', iOS)}
            </Indexes>
          </InfoBlock>
        </IndexRow>
        <ReviewBlock>
          {typeof review === 'string' ? <p>{review}</p> : _.map(review, (p, i) => (<p key={i}>{p}</p>))}
        </ReviewBlock>
      </Container>
    )
  }
}
