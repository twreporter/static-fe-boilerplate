import { fontWeight } from '../../constants/style'
import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import routes from '../routes'
import styled from 'styled-components'

const text = {
  title: '猜猜世足成就最多的前5名球星',
  subTitle: '（2018年不列入計算）',
}

const styledConstants = {
  lineHeight: 34,
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 30px;
  ${mq.desktopAbove`
    margin-bottom: 42px;
  `}
`

const Line = styled.div`
  position: relative;
  height: ${styledConstants.lineHeight}px;
  &::after {
    content: " ";
    background-color: #fff;
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(-2050%);
  }
  &::before {
    content: " ";
    background-color: #fff;
    position: absolute;
    display: block;
    width: 4px;
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translateX(1950%);
  }
`

const Board = styled.div`
  position: relative;
  width: 78%;
  min-width: 250px;
  max-width: 355px;
  box-shadow: 0 2px 0 0 #395e25;
  background-color: #124810;
  border: solid 3px #ffffff;
  margin: 0 auto;
`

const Title = styled.div`
  font-size: 20px;
  ${mq.miniOnly`
    font-size: 17px;
  `}
  font-weight: ${fontWeight.bold};
  letter-spacing: 0.5px;
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
`

const SubTitle = styled.div`
  font-size: 16px;
  ${mq.miniOnly`
    font-size: 14px;
  `}
  font-weight: ${fontWeight.regular};
  text-align: center;
  color: #ffffff;
  white-space: nowrap;
`

const BackToManual = styled.div`
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 0 5px 5px 0;
  box-shadow: 0 2px 0 #395e25;
  background-color: #f0932a;
  border: solid 3px #ffffff;
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translate(100%, 3px);
  text-align: center;
  cursor: pointer;
  >span {
    line-height: 24px;
    font-size: 18px;
    color: #fff;
  }
`

export default class Banner extends PureComponent {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
    tempRanking: PropTypes.array.isRequired,
  }
  _goToManual = () => {
    const { goTo, tempRanking } = this.props
    return goTo(routes.manual.path, { tempRanking }, routes.selection.path.replace('/', ''))
  }
  render() {
    return (
      <Container>
        <Line />
        <Board>
          <Title>{text.title}</Title>
          <SubTitle>{text.subTitle}</SubTitle>
          <BackToManual onClick={this._goToManual}><span>？</span></BackToManual>
        </Board>
      </Container>
    )
  }
}
