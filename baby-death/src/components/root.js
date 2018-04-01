import Opening from '../components/opening'
import Area1 from '../components/area-1'
import Area2 from '../components/area-2'
import Area3 from '../components/area-3'
import Area4 from '../components/area-4'
import Area5 from '../components/area-5'
import Area6 from '../components/area-6'
import Area7 from '../components/area-7'
import Area8 from '../components/area-8'
import Area9 from '../components/area-9'
import Area10 from '../components/area-10'
import Area11 from '../components/area-11'
import ArticleFooter from '../components/footer'
import Footer from '@twreporter/react-components/lib/footer'
import rabbitImg from '../../static/area-12/a12.png'
import React from 'react'
import styled from 'styled-components'
import reusedComponents from './reused-components'

const { StyledTitle, StyledParagraph, StyledAreaContainer } = reusedComponents


const mockup = {
  container: {
    width: 360,
  },
  viewport: {
    width: 375,
  },
}

const Container = styled.div`
  background: linear-gradient(#b5e4e0, #7da39f);
`

const InnerBlock = styled.article`
  width: ${(mockup.container.width / mockup.viewport.width) * 100}%;
  max-width: 550px;
  margin: 0 auto;

  section {
    margin-top: 60px;
  }
`

const Area12ImgContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: ${375 / 410 * 100}%;
`

const Area12Img = styled.img`
  width: ${157 / 375 * 100}%;
  position: absolute;
  left: ${138 / 375 * 100}%;
  top: ${150 / 410 * 100}%;
`

export default class Root extends React.Component {
  render() {
    return (
      <Container>
        <InnerBlock>
          <Opening />
          <Area1
            title={'2月總體死亡人數\n高於出生人數'}
            paragraphs={['今年（2018）2月，台灣全年齡死亡人數高於出生人數1025人。在少子化與高齡化雙重夾擊下，每一個小生命的離去，不僅令一個家庭心碎，整個社會也都會付出「動搖國本」的代價。']}
            annotations={['資料來源：內政部戶政司']}
            fontColors={{
              title: 'rgb(107,130,128)',
              paragraph: '#6a8280',
              annotation: '#fff',
            }}
          />
          <Area2
            title={'台灣嬰兒死亡率\n在OECD國家中第5高'}
            paragraphs={['台灣1歲以下嬰兒死亡率在由先進國家所組成的「經濟合作暨發展組織」（OECD）中排名第5高，偏高的嬰兒死亡率反映兒童醫療照顧和資源分配不均的問題。']}
            annotations={['資料來源：成大健康資料加值應用研究中心']}
            fontColors={{
              title: 'rgb(107,130,128)',
              paragraph: '#6a8280',
              annotation: '#fff',
            }}
          />
          <Area3
            title={'兒童死因以嬰兒期\n發生的疾病為大宗'}
            paragraphs={['兒童主要死因，不僅歸咎於破了洞社會安全網（例如交通事故、故意傷害等），醫療體系是否完善也是關鍵。其中高達45%死因，為嬰兒期發生的「先天畸形」與早產相關的「周產期疾病」。']}
            annotations={['資料來源：台灣兒童死因複診及分析先驅計畫']}
            fontColors={{
              title: '#6a8280',
              paragraph: '#6a8280',
              annotation: '#fff',
            }}
          />
          <Area4
            title={'0~4歲嬰幼兒急診需求\n為19歲以下兒童最高'}
            paragraphs={['根據統計，19歲以下兒童急診人數約有103萬人，其中以0～4歲嬰幼兒比例最高。當嬰兒有突發狀況，第一時間的診治可能就是生死一瞬。']}
            annotations={['資料來源：2016年醫療統計年報']}
            fontColors={{
              title: '#6a8280',
              paragraph: '#6a8280',
              annotation: '#fff',
            }}
          />
          <Area5
            title={'山地鄉嬰兒死亡率\n近20年居高不下'}
            paragraphs={['對依賴醫療照顧的嬰幼兒來說，居住在都會區或山地鄉，便有截然不同的命運。近20年來，台灣山地鄉嬰兒死亡率都是都會區的兩倍以上，醫療資源分配不均問題長年未解。']}
            annotations={['註：山地鄉為《地方制度法》中指稱的原住民鄉鎮，在直轄市升格後，目前有24個山地鄉，及6個山地原住民區。', '資料來源：成大健康資料加值應用研究中心']}
            fontColors={{
              title: '#6a8280',
              paragraph: '#6a8280',
              annotation: '#fff',
            }}
          />
          <Area6
            title="近3成台灣兒童就醫路迢迢"
            paragraphs={['許多兒童無法及時接受合適治療。台灣本島有2000多個村里在其15公里道路距離內，完全沒有小兒科專科醫師。']}
            annotations={['資料來源：廖興中（2013）《臺灣小兒科醫療資源空間可接近性分析》']}
            fontColors={{
              title: '#6a8280',
              paragraph: '#6a8280',
              annotation: '#fff',
            }}
          />
          <Area7
            title={'5縣市沒有加護型救護車\n病童轉運的救護能力低'}
            paragraphs={['孩童的轉運過程也潛藏危機，在台灣，5個縣市和離島地區沒有一台加護型救護車。', '與一般救護車相比，加護型救護車配備可攜帶式心臟監視器、電擊去顫器、甚至可接葉克膜，是病童轉運重要的設備。']}
            annotations={['資料來源：衛福部']}
            fontColors={{
              title: '#b5e4df',
              paragraph: '#cbf4f0',
              annotation: '#e7e7e7',
            }}
          />
          <Area8
            title="兒童急診醫療資源艱困區擴大中"
            paragraphs={['2011年全台有27％縣市缺乏兒科急診醫師，到了2015年擴增至61％，迄今仍維持同樣比例。每年，4萬5千個孩子到急診就醫，沒有兒科醫師診治。', '衛福部2016年雖然於辦理「提升兒科醫療品質及資源整合計畫」，補助15縣巿增聘兒科醫師看急診，但並未減少兒急醫療艱困區域。']}
            annotations={['註：醫療艱困區代表「24小時有兒科急診醫院的數量小於等於2間」。', '資料來源：台灣兒科醫學會（兒科急診醫療資源）、衛福部「提升兒科醫療品質及資源整合計畫」']}
            fontColors={{
              title: '#b5e4df',
              paragraph: '#cbf4f0',
              annotation: '#e7e7e7',
            }}
          />
          <Area9
            title={'兒童重症醫師不足\n醫病比與美國差3倍'}
            paragraphs={['兒童重症醫療照護也是失落的一塊，兒童重症科醫師需受完整訓練，在加護病房24小時監控病情。', '全台僅142名兒童重症科醫師，負擔全年近9萬人日住院病童的照護，平均每個醫師要照顧3到4床，但美國醫師幾乎可以一對一照護。']}
            annotations={['資料來源：兒科醫學會兒童重症委員會主任委員謝凱生醫師']}
            fontColors={{
              title: '#b5e4df',
              paragraph: '#b5e4df',
              annotation: '#e7e7e7',
            }}
          />
          <Area10
            title={'嬰兒病床不足\n新竹縣最嚴重'}
            paragraphs={['被病痛所苦的嬰兒，有時連病床也求不到。根據統計，每萬人平均有41張一般病床可使用，但嬰兒病床卻只有0.64床。全台嬰兒病床普遍不足，新竹縣最嚴重、其次為新北、苗栗。']}
            annotations={['公式：各縣市1歲以下兒童人口數/各縣市的嬰兒病床數', '資料來源：衛福部']}
            fontColors={{
              title: '#b5e4df',
              paragraph: '#b5e4df',
              annotation: '#e7e7e7',
            }}
          />
          <Area11
            title="早產率高的地區，新生兒加護病床卻極少"
            paragraphs={['台灣早產兒出生率由2006年的7.3%，上升至2015年的8.5%，一年約有1,800個低體重早產兒，需要新生兒加護病房照料。但早產兒比例高的地區卻面臨病床不足的困境，早產率高居第二名的台東縣，只能送往鄰近的花蓮救治。']}
            annotations={['資料來源：衛福部']}
            fontColors={{
              title: '#b4e3de',
              paragraph: '#b5e4df',
              annotation: '#e7e7e7',
            }}
          />
          <StyledAreaContainer>
            <StyledTitle
              color="#fff"
            >通過兒童公約的台灣<br />兒童預算卻僅有2％
            </StyledTitle>
            <StyledParagraph
              color="#fff"
            >
              2014年台灣簽署《聯合國兒童權利公約》，將公約國內法化。明確規範，無論社會福機構、法院、政府機構，均應以兒童最大利益為第一優先考量。
            </StyledParagraph>
            <StyledParagraph
              color="#fff"
            >
              但在台灣，佔全國人口數約19％的兒童，僅佔健保支出的7.87％。兒少預算僅佔整體預算2.43%，為美國的三分之一。
            </StyledParagraph>
            <StyledParagraph
              color="#fff"
              style={{
                marginTop: '30px',
              }}
            >
              坑坑洞洞的兒童醫療網，孩子陷落只是一瞬之間。
            </StyledParagraph>
            <StyledParagraph
              color="#fff"
            >
              政府大張旗鼓催生的同時，應正視兒童醫療資源不足、不均的問題。
            </StyledParagraph>
            <StyledParagraph
              color="#fff"
            >
              每個來到世上的孩子，都有活下去的權利。
            </StyledParagraph>
            <Area12ImgContainer>
              <Area12Img src={rabbitImg} />
            </Area12ImgContainer>
          </StyledAreaContainer>
          <ArticleFooter />
        </InnerBlock>
        <Footer />
      </Container>
    )
  }
}
