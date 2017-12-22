import styled from 'styled-components'
import React from 'react'
import Logo from '../../../static/logo-white.svg'
import * as styles from '../../constants/style-variables'
import mq from '../..//utils/media-query'

const Container = styled.div`
  opacity: 0;
  position: absolute;
  width: 100%;
  text-align: center;
  @media (min-aspect-ratio: 677/1250) {
    top: 21%;
  }
  @media (max-aspect-ratio: 677/1250) {
    top: 26%;
  }
  ${mq.desktopAbove`
    top: 187px;
  `}
`

const Title = styled.h1`
  font-weight: ${styles.fontWeight.heavy};
  color: ${styles.colors.pinkishGrey};
  font-size: ${styles.fontSize.openingTitle.mobile};
  line-height: 1;
  margin: 0;
  margin-bottom: 15px;
  ${mq.tabletOnly`
    font-size: ${styles.fontSize.openingTitle.tablet};
  `}
  ${mq.tabletAbove`
    font-size: ${styles.fontSize.openingTitle.desktop};
    margin-bottom: 20px;
  `}
`

const Subtitle = styled.p`
  color: ${styles.colors.pinkishGrey};
  font-weight: ${styles.fontWeight.normal};
  font-size: ${styles.fontSize.openingSubtitle.mobile};
  line-height: 1;
  margin: 0;
  margin-bottom: 16px;
  ${mq.tabletOnly`
    font-size: ${styles.fontSize.openingSubtitle.tablet};
  `}
  ${mq.tabletAbove`
    font-size: ${styles.fontSize.openingSubtitle.desktop};
    margin-bottom: 16px;
  `}
`

const LogoWrapper = styled.div`
  height: 16px;
  margin-bottom: 3px;
  opacity: .5;
  >svg {
    height: 100%;
  }
  ${mq.tabletOnly`
    height: 19px;
  `}
  ${mq.desktopAbove`
    height: 24px;
  `}
`

const Date = styled.p`
  margin: 0;
  color: ${styles.colors.pinkishGrey};
  font-weight: ${styles.fontWeight.light};
  font-size: ${styles.fontSize.openingDate.mobile};
  opacity: .5;
  ${mq.tabletOnly`
    font-size: ${styles.fontSize.openingDate.tablet};
  `}
  ${mq.tabletAbove`
    font-size: ${styles.fontSize.openingDate.desktop};
  `}
`

class OpeningWords extends React.PureComponent {
  render() {
    return (
      <Container>
        <Title>台灣勞工職業病圖譜</Title>
        <Subtitle>新興的風險與隱藏的黑數</Subtitle>
        <LogoWrapper><Logo /></LogoWrapper>
        <Date>2017.11.28</Date>
      </Container>
    )
  }
}

export default OpeningWords
