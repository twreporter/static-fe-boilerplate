import { fontSize, fontWeight, colors } from '../../constants/style-variables'
import Logo from '../../../static/logo.svg'
import mq from '../../utils/media-query'
import React from 'react'
import RelatedItem from './related-item'
import styled from 'styled-components'

const Container = styled.div`
  ${mq.tinyOnly`
    padding-top: 25px;
  `}
  ${mq.mobileOnly`
    padding-top: 30px;
  `}
`

const LogoWrapper = styled.a`
  display: block;
  margin: 0 auto;
  text-decoration: none;
  text-align: center;
  width: 20px;
  >svg {
    width: 100%;
  }
`

const Team = styled.div`
  margin: 2.54em auto 1.4em auto;
  text-align: center;
  color: ${colors.text};
  opacity: 0.8;
  font-weight: ${fontWeight.normal};
  font-size: ${fontSize.team.mobile};
  ${mq.mobileBelow`
    width: 80%;
  `}
  ${mq.desktopAbove`
    font-size: ${fontSize.team.destop};
    margin-bottom: 2.4em;
  `}
  p {
    margin: 0;
    margin-bottom: 1em;
  }
  p:last-child {
    margin: 0;
  }
`

class Colophon extends React.PureComponent {
  render() {
    return (
      <Container>
        <RelatedItem
          description="《報導者》與立委吳玉琴辦公室進行19家醫學中心看護調查，揭露醫院內的「照護黑洞」，不僅影響醫療品質、也損及病家權益。"
          imageSrc="https://storage.googleapis.com/twreporter-multimedia/images/20181105222603-29ba42d5075131500bba492e0a02d4bc-tiny.jpg"
          title="你不知的住院真相：看護7成外包，風險誰扛？"
          to="https://www.twreporter.org/a/nursing-aide-crisis-of-taking-care-survey"
        />
        <RelatedItem
          description="台大新竹分院的全院共聘照護制，是台灣第三波全責照護實驗的指針。它如何讓照服員和家屬安心信任新制度？"
          imageSrc="https://storage.googleapis.com/twreporter-multimedia/images/20181105225450-f2e935c604be6985de35dcefd769381a-tiny.jpg"
          title="台大新竹分院的照服員共聘制，會是全責照護的曙光嗎？"
          to="https://www.twreporter.org/a/nursing-aide-crisis-of-taking-care-total-care"
        />
        <Team>
          <p>文：楊惠君、葉瑜娟、陳麗婷</p>
          <p>設計：黃禹禛</p>
          <p>工程：余崇任</p>
          <p>PM：陳貞樺</p>
          <p>編輯：張詩芸</p>
          <p>諮詢、 感謝：周照芳、滕西華、吳玉琴、陳曼寧</p>
        </Team>
        <LogoWrapper href="https://www.twreporter.org" target="_blank"><Logo /></LogoWrapper>
      </Container>
    )
  }
}

export default Colophon
