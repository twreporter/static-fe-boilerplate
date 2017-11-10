import RelatedItem from './related-item'
import React from 'react'
import styled from 'styled-components'
import Logo from '../../../static/logo.svg'
import { fontSize, fontWeight, colors } from '../../constants/style-variables'
import mq from '../../utils/media-query'

const Container = styled.div`
  ${mq.mobileOnly`
    padding-top: 22%;
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
  margin-top: 2.54em;
  margin-bottom: 1.4em;
  text-align: center;
  color: ${colors.pinkishGrey};
  opacity: 0.8;
  font-weight: ${fontWeight.normal};
  font-size: ${fontSize.team.mobile};
  ${mq.desktopAbove`
    font-size: ${fontSize.team.destop};
  `}
  p {
    margin: 0;
    margin-bottom: 1.14em;
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
          description="致死率極高的惡性間皮瘤，因為與石綿暴露的因果關係相當明確，在許多國家都是職業病補償大宗，但在台灣卻困難重重。"
          imageSrc="https://storage.googleapis.com/twreporter-multimedia/images/20171017151337-4450561d64afde60d37cd23746720a6a-tiny.jpg"
          title="致命粉塵的犧牲者：職業病被個人化的台灣社會"
          to="https://www.twreporter.org/a/bookreview-occupational-disease-asbestos"
        />
        <RelatedItem
          description="事發至今已近4個多月，羅玉芬的過勞職災終於得到重新認定機會，對家屬來說，不平的申訴之路終於往前跨出一小步。"
          imageSrc="https://storage.googleapis.com/twreporter-multimedia/images/20170905135019-94174b03fc05cfbc1d05611dff43b3d9-tiny.jpeg"
          title="【全聯員工之死】 資方提供班表不實 重啟過勞職災認定"
          to="https://www.twreporter.org/a/death-of-pxmart-labor"
        />
        <RelatedItem
          description="上路不到一年的「一例一休」，最近又要大修了，修完之後，有何不同？勞工又會得到什麼呢？"
          imageSrc="https://storage.googleapis.com/twreporter-multimedia/images/20171106095955-140f4e805cc0e077efeeff3aee8bbad2-tiny.png"
          title="【一例一休急轉彎】勞權倒退30年的大修法 "
          to="https://www.twreporter.org/a/refine-labour-law-moving-backward"
        />
        <Team>
          <p>製作：鄭涵文、陳貞樺、黃禹禛、余崇任</p>
          <p>監製：楊惠君</p>
          <p>諮詢、感謝：鄭雅文、陳秉暉、林子涵、陳宗延</p>
        </Team>
        <LogoWrapper href="https://www.twreporter.org" target="_blank"><Logo /></LogoWrapper>
      </Container>
    )
  }
}

export default Colophon
