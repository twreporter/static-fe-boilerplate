import React from 'react'
import illustrator from '../../static/opening/opening.png'
import logo from '../../static/opening/logo.png'
import title from '../../static/opening/title.png'
import styled from 'styled-components'
import reusedComponents from './reused-components'

const { StyledParagraph } = reusedComponents

const StyledIntro = StyledParagraph.extend`
  width: 95%;
  margin: 25px auto 0 auto;
  font-size: 20px;
  line-height: 1.7;
  color: #6A8280;
  @media only screen and (min-width: 768px) {
    font-size: 24px;
  }
`

const StyledIllustratorContainer = styled.div`
  padding-bottom: ${375 / 367 * 100}%;
  position: relative;
  margin-bottom: 30px;
`

const StyledIllustrator = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const Center = styled.header`
  width: 100%;
  text-align: center;

  img:first-child {
    width: ${118 / 375 * 100}%;
    margin-top: 20px;
    margin-bottom: 25px;
  }

  img:nth-child(2) {
    margin-bottom: 15px;
  }
`

export default class Opening extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Center>
          <a href="https://www.twreporter.org" target="_blank" rel="noopener noreferrer"><img src={logo} alt="報導者" /></a>
          <img src={title} width="100%" alt="消逝的孩子，如何墜落醫療網黑洞" />
        </Center>
        <StyledIllustratorContainer>
          <StyledIllustrator
            src={illustrator}
          />
        </StyledIllustratorContainer>
        <StyledIntro>
          台灣在2018年正式邁入高齡社會，銀髮海嘯下孩子身影更顯稀落，過去一年來孩子生得少、卻死得多，逾1,800名兒童死去，死亡率名列已開發國末段班，當出生的孩子都留不住，催生口號更顯空洞。
        </StyledIntro>
        <StyledIntro>
          台灣擁有諾貝爾獎得主都盛讚的「世界最佳健保體系」，為什麼他們來不及長大？兒童醫療體系出了什麼問題？我們是否能及時補破網，不再漏接？
        </StyledIntro>
        <StyledIntro>
          註：本專題所述「兒童」為19歲以下兒童
        </StyledIntro>
      </React.Fragment>
    )
  }
}
