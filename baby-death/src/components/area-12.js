import React from 'react'
import rabbitImg from '../../static/area-12/a12.png'
import reusedComponents from './reused-components'
import styled from 'styled-components'
import title12 from '../../static/area-12/a12-title.png'
import line from '../../static/area-12/line.png'

const { StyledTitle, StyledParagraph, StyledAreaContainer } = reusedComponents

const Area12ImgContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: ${375 / 390 * 100}%;
`

const Area12Img = styled.img`
  width: ${157 / 375 * 100}%;
  position: absolute;
  left: ${138 / 375 * 100}%;
  top: ${150 / 410 * 100}%;
`

export default class Area12 extends React.PureComponent {
  render() {
    return (
      <StyledAreaContainer>
        <header
          style={{
            margin: '30px auto',
            width: `${288 / 375 * 100}%`,
          }}
        >
          <img alt="通過兒童公約的台灣兒童預算卻僅有2％" src={title12} width="100%" />
          <StyledTitle>通過兒童公約的台灣兒童預算卻僅有2％
          </StyledTitle>
        </header>
        <StyledParagraph
          color="#4e6361"
        >
          2014年台灣簽署《聯合國兒童權利公約》，將公約國內法化。明確規範，無論社會福機構、法院、政府機構，均應以兒童最大利益為第一優先考量。
        </StyledParagraph>
        <StyledParagraph
          color="#4e6361"
        >
          但在台灣，佔全國人口數約19％的兒童，僅佔健保支出的7.87％。兒少預算僅佔整體預算2.43%，為美國的三分之一。
        </StyledParagraph>
        <div
          style={{
            textAlign: 'center',
            marginTop: '40px',
            marginBottom: '40px',
          }}
        >
          <img
            alt="底線"
            src={line}
            style={{
              width: `${126 / 375 * 100}%`,
            }}
          />
        </div>
        <StyledParagraph
          color="#4e6361"
          style={{
            marginTop: '30px',
          }}
        >
          坑坑洞洞的兒童醫療網，孩子陷落只是一瞬之間。
        </StyledParagraph>
        <StyledParagraph
          color="#4e6361"
        >
          政府大張旗鼓催生的同時，應正視兒童醫療資源不足、不均的問題。
        </StyledParagraph>
        <StyledParagraph
          color="#4e6361"
        >
          每個來到世上的孩子，都有活下去的權利。
        </StyledParagraph>
        <Area12ImgContainer>
          <Area12Img src={rabbitImg} />
        </Area12ImgContainer>
      </StyledAreaContainer>
    )
  }
}
