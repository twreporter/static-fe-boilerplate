import * as styles from '../../constants/style-variables'
import Logo from '../../../static/logo-white.svg'
import mq from '../..//utils/media-query'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  z-index: -1;
  opacity: 0;
  position: absolute;
  width: 100%;
  text-align: center;
  @media all and (orientation: portrait) {
    ${mq.tabletBelow`
      top: 33%;
    `}
    ${mq.desktopAbove`
      top: 40%;
    `}
  }
  @media all and (orientation: landscape) {
    ${mq.tabletBelow`
      top: 200px;
    `}
    ${mq.desktopAbove`
      top: 33%;
    `}
  }
`

const Title = styled.h1`
  font-weight: ${styles.fontWeight.heavy};
  color: ${styles.colors.text};
  font-size: ${styles.fontSize.openingTitle.mobile};
  line-height: 1;
  margin: 0;
  margin-bottom: 15px;
  ${mq.tinyOnly`
    font-size: ${styles.fontSize.openingTitle.tiny};
  `}
  ${mq.tabletOnly`
    font-size: ${styles.fontSize.openingTitle.tablet};
  `}
  ${mq.tabletAbove`
    font-size: ${styles.fontSize.openingTitle.desktop};
    margin-bottom: 20px;
  `}
`

const Subtitle = styled.p`
  color: ${styles.colors.text};
  font-weight: ${styles.fontWeight.normal};
  font-size: ${styles.fontSize.openingSubtitle.mobile};
  line-height: 1;
  margin: 0 auto 16px auto;
  ${mq.tinyOnly`
    font-size: ${styles.fontSize.openingSubtitle.tiny};
    width: 90%;
  `}
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
  &>svg {
    height: 100%;
  }
  ${mq.tabletOnly`
    height: 19px;
  `}
  ${mq.desktopAbove`
    height: 24px;
  `}
`

// const Date = styled.p`
//   margin: 0;
//   color: ${styles.colors.text};
//   font-weight: ${styles.fontWeight.light};
//   font-size: ${styles.fontSize.openingDate.mobile};
//   opacity: .5;
//   ${mq.tabletOnly`
//     font-size: ${styles.fontSize.openingDate.tablet};
//   `}
//   ${mq.tabletAbove`
//     font-size: ${styles.fontSize.openingDate.desktop};
//   `}
// `

class OpeningWords extends React.PureComponent {
  render() {
    return (
      <Container>
        <Title>被隱藏的醫療帳單</Title>
        <Subtitle>一年600億住院看護費用誰該埋單？</Subtitle>
        <LogoWrapper><Logo /></LogoWrapper>
      </Container>
    )
  }
}

export default OpeningWords
