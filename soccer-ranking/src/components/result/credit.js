import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { fontWeight } from '../../constants/style'
import footBallIcon from '../../../static/icon/icon-2-shadow.png'

const Container = styled.div`
  padding: 10px 0 40px 0;
`

const Icon = styled.div`
  margin: 0 auto 16px auto;
  background-image: url(${props => props.image});
  background-position: center center;
  background-size: contain;
  width: 20px;
  height: 20px;
  background-repeat: no-repeat;
`

const Title = styled.div`
  font-size: 18px;
  font-weight: ${fontWeight.bold};
  line-height: 1.67;
  text-align: center;
  color: #ffffff;
`

const TextRow = styled.div`
  font-size: 16px;
  font-weight: ${fontWeight.regular};
  line-height: 1.88;
  text-align: center;
  color: #ffffff;
`

const Section = styled.div`
  margin-bottom: 40px;
`

export default class Credit extends PureComponent {
  render() {
    return (
      <Container>
        <Icon image={footBallIcon} />
        <Section>
          <Title>資料來源</Title>
          <TextRow>FIFA World Cup awards</TextRow>
          <TextRow>FIFA World Cup</TextRow>
          <TextRow>FIFA World Cup™ Players Statistics</TextRow>
          <TextRow>維基百科</TextRow>
        </Section>
        <Section>
          <Title>製作團隊</Title>
          <TextRow>文字｜吳柏緯、陳貞樺</TextRow>
          <TextRow>設計｜黃禹禛</TextRow>
          <TextRow>工程｜余崇任</TextRow>
          <TextRow>監製｜楊惠君</TextRow>
        </Section>
      </Container>
    )
  }
}
