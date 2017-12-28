import PlainText from '../utils/plain-text-section'
import React from 'react'
import sectionFourData from '../../data/section-four'
import styled from 'styled-components'
import { TextContainer, Title } from '../utils/text-utils'
import { colors } from '../../styles/common-variables'

const Container = styled.div`
  width: 100%;
  background: linear-gradient(to bottom, #639ac0 0%, #ffffff 36%);
  padding-top: 2em;
`

const Divider = styled.div`
  background-color: #c71b0a;
  height: 2px;
  width: 200px;
  margin: 40px auto 40px auto;
`

const Contributors = styled.div`
  margin: 0 auto 40px auto;
  color: gray;
  line-height: 1.8;
`

const SectionFourTitle = Title.extend`
  line-height: 1.4;
`

const data = ['文字 ｜ 張子午', '設計 ｜ 林珍娜', '攝影 ｜ 曾原信', '影音 ｜ 余志偉', 'P M ｜ 陳貞樺', '工程 ｜ 曾涵郁']

class SectionFour extends React.PureComponent {
  render() {
    const contributors = (() => {
      return data.map((v, i) => {
        return (
          <div
            key={i}
          >
            {v}
          </div>
        )
      })
    })()
    return (
      <Container>
        <TextContainer>
          <SectionFourTitle
            fontColor={`${colors.textBlack}`}
            dangerouslySetInnerHTML={{ __html: sectionFourData.title }}
          />
        </TextContainer>
        <PlainText
          content={sectionFourData.content}
          fontWeight={400}
        />
        <Divider />
        <Contributors>
          {contributors}
        </Contributors>
      </Container>
    )
  }
}

export default SectionFour
