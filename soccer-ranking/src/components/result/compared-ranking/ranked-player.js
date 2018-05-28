import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import { fontWeight } from '../../../constants/style'
import { medalS } from '../../../constants/image-paths'
import checkedImage from '../../../../static/icon/correct.png'

export const styleConstants = {
  avatarSize: 60,
  playerWidth: 119,
  playerHeight: 87,
  playerMargin: 10,
  rankWidth: 24,
  rankMargin: 7,
  avatarMargin: 14,
}

const Container = styled.div`
  height: ${styleConstants.playerHeight}px;
  width: ${styleConstants.playerWidth}px;
  margin-bottom: ${styleConstants.playerMargin}px;
  display: flex;
  flex-direction: ${props => (props.revert ? 'row-reverse' : 'row')};
`

const rankCheckedCss = css`
  position: relative;
  &::after {
    content: " ";
    position: absolute;
    background-image: url(${checkedImage});
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    width: 18px;
    height: 18px;
    left: 50%;
    top: 51px;
    transform: translateX(-50%);
  }
`

const Rank = styled.div`
  width: ${styleConstants.rankWidth}px;
  margin-left: ${styleConstants.rankMargin}px;
  margin-right: ${styleConstants.rankMargin}px;
  background-image: url(${props => medalS[props.rank - 1]});
  background-size: 24px 35px;
  background-position: center ${(styleConstants.avatarSize - 35) / 2}px;
  background-repeat: no-repeat;
  ${props => (props.isTop5 ? rankCheckedCss : '')}
`

const Avatar = styled.div`
  width: ${styleConstants.avatarSize}px;
  height: ${styleConstants.avatarSize}px;
  margin-left: ${styleConstants.avatarMargin}px;
  margin-right: ${styleConstants.avatarMargin}px;
  background-image: ${props => `url(${props.image})`};
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  background-color: #ffffff;
  position: relative;
  &::after {
    content: "${props => props.name}";
    position: absolute;
    left: 50%;
    bottom: -27px;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 18px;
    color: #f5c551;
    font-weight: ${fontWeight.bold};
  }
`

export default class RankedPlayer extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    revert: PropTypes.bool,
    isTop5: PropTypes.bool,
  }

  static defaultProps = {
    revert: false,
    isTop5: false,
  }

  render() {
    const { name, rank, image, revert, isTop5 } = this.props
    return (
      <Container revert={revert}>
        <Rank rank={rank} isTop5={isTop5} />
        <Avatar image={image} name={name} />
      </Container>
    )
  }
}
