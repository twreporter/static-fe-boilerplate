import React from 'react'
import TextBox from '../components/contents/text-box'
import ImageWrapper from '../components/contents/static-image'
import styled from 'styled-components'

import DiseaseTypeTimeGraph01 from '../../static/disease-type-time-graph-01.svg'
import DiseaseTypeTimeGraph02 from '../../static/disease-type-time-graph-02.svg'
import DiseaseTypeTimeGraph0201 from '../../static/disease-type-time-graph-02-01.svg'
import DiseaseTypeTimeGraph0202 from '../../static/disease-type-time-graph-02-02.svg'
import DiseaseTypeTimeGraph0203 from '../../static/disease-type-time-graph-02-03.svg'

import diseaseTypeRank from '../../static/disease-type-rank.png'
import topDiseaseType from '../../static/top-disease-type-world.png'

import japanMentalDisorder from '../../static/mental-disorder-japan.png'
import noise from '../../static/noise.png'

import threePeople from '../../static/three-people.png'
import WorkingHours from '../../static/working-hours-ranking.svg'

import cancer2016 from '../../static/taiwan-2016-cancer.png'
import cvd2016 from '../../static/taiwan-2016-cvd.png'
import mentalDisorder2016 from '../../static/taiwan-2016-mental-disorder.png'

import cancerRank from '../../static/cancer-rank-taiwan.png'

import threeLowBase from '../../static/three-low-base.png'
import threeLow01 from '../../static/three-low-01.png'
import threeLow02 from '../../static/three-low-02.png'
import threeLow03 from '../../static/three-low-03.png'
import threeLow04 from '../../static/three-low-04.png'

import whatCanIDo from '../../static/what-can-i-do.png'

import OpeningBackground from '../components/contents/opening-background'
import OpeningWords from '../components/contents/opening-words'
import TextPage from '../components/contents/text-page'
import tsaitracker from '../../static/tsaitracker.png'

import Colophon from '../components/contents/colophon'

const Image = styled.img`
  width: 100%;
  height: auto;
`

const imageEnter = {
  animation: {
    opacity: [1, 0],
    translateY: [0, 0],
  },
  duration: 500,
  delay: 500,
  interruptBehavior: 'stop',
}

const leaveStay = {
  animation: {
    translateY: 0,
    opacity: [0, 1],
  },
  duration: 200,
  interruptBehavior: 'finish',
}

const noDelayEnter = {
  animation: {
    opacity: [1, 0],
    translateY: [0, '30px'],
  },
  duration: 500,
  delay: 500,
  interruptBehavior: 'stop',
}

const slides = [
  {
    containerType: 'layers',
    contents: [
      {
        runOnMount: true,
        enter: {
          animation: {
            opacity: [1, 0],
            translateY: [0, '40px'],
          },
          duration: 900,
          delay: 2600,
          interruptBehavior: 'stop',
        },
        leave: {
          animation: {
            opacity: 0,
          },
          duration: 500,
          interruptBehavior: 'finish',
        },
        jsx: (<OpeningWords />),
      },
      {
        runOnMount: true,
        enter: {
          animation: {
            opacity: [1, 0],
          },
          duration: 900,
          delay: 1000,
          interruptBehavior: 'stop',
        },
        leave: {
          animation: {
            opacity: 0,
          },
          duration: 500,
          interruptBehavior: 'finish',
        },
        jsx: (<OpeningBackground />),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: noDelayEnter,
        jsx: (
          <TextPage
            text={[
              '可曾想過，你可能是在職場上生了病、需要休息甚至被補償的「職業病黑數」之一嗎？或許沒有，因為你拚命、認份掙錢之際，其實常沒想到你自己。',
              '在職場上要奴，最少也該健康地奴，才是國家真實的競爭力。但在台灣，「職業病」卻常被低估、視而不見，且職災相關補償辦法還散落在不同法規裡，造成職業病被嚴重低估。',
              '除了知道自己住在過勞之島上，你該知道更多，勞工拼產值，但職場和制度夠健康嗎？且讓我們用數字看下去。',
            ]}
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={noise} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="常常被忽略的「職業病」"
            description={[
              '「職業病」指工作時因暴露於化學性、物理性、生物性、人因性等因子而導致的疾病，像因超時工作而過勞，或工作環境有強烈噪音而有聽力損失。',
              '和「職業傷害」（指立即意外傷害，如從鷹架跌落而骨折）比較起來，「職業病」通常較難認定，也較難被發現、補償。',
            ]}
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper><DiseaseTypeTimeGraph01 /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="台灣以呼吸道、肌肉骨骼疾病最多"
            description={[
              '職業病案量是重視勞權的國家才看得見的數字，發現越多通常代表社會越重視。',
              '肌肉骨骼疾病在多數國家案件數日漸增高，反映的是重複性動作多、過度使用特定部位的工作型態。呼吸道疾病經診斷後幾乎都會成案。',
            ]}
            footnote="資料來源、諮詢：鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><DiseaseTypeTimeGraph02 /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox />
        ),
      },
    ],
    displayOn: [3, 6],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper><DiseaseTypeTimeGraph0201 /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="職病給付的第一波高潮：塵肺症"
            description={[
              '塵肺症是台灣職業病給付冠軍，長期暴露於粉塵的勞工都是高風險群。當時工傷協會主導抗爭，使勞保局修訂辦法開放退休礦工申請殘廢給付，而有一波「礦工求償潮」，3年間求償金額高達 40 億元。',
            ]}
            footnote="資料來源、諮詢：鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper><DiseaseTypeTimeGraph0202 /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="職病給付的第二波高潮：呼吸道疾病"
            description={[
              '勞動部政策鼓勵「職業病通報」，職業醫學科醫師因此找到不少陶瓷工廠、衛浴、齒模、磁磚等與「礦物性粉塵」高度接觸的個案。',
            ]}
            footnote="資料來源、諮詢：鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><DiseaseTypeTimeGraph0203 /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="職病給付的第三波高潮：職業性癌症"
            description={[
              'RCA 地下水污染案一審勝訴，一次新增一百多件「職業性癌症」個案（全年共 146 件）。',
            ]}
            footnote="資料來源、諮詢：鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 260px)"><Image src={diseaseTypeRank} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="2016 年台灣職業病前五名"
            description={[
              '第一名：手臂肩頸疾病<br />第二名：職業性下背痛<br />第三名：呼吸道相關疾病<br />第四名：過勞<br />第五名：職業性癌症',
              '勞保職業病現金給付多發生在製造業和營建工程業。',
            ]}
            footnote="資料來源：2016 年勞工保險職業病現金給付統計"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={topDiseaseType} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="職業病樣態反映各國關注面向"
            description={[
              '雖說呼吸道、肌肉類疾病是多數國家的共同趨勢，但不同的國情與勞保制度，仍造成職病樣貌的差異。',
              '像日本、澳洲職業性精神疾病案件特別多，即因社會特別關注相關議題，或學界對該病的認定不傾向個人歸因。',
            ]}
            footnote="資料來源、諮詢：陳秉暉、鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={threePeople} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            description={[
              '職業病的發現與認定，也會隨著社會發展變化。近年來，除了肌肉、呼吸道疾病，因高工時過勞而促發的健康問題、因環境惡劣罹癌等因素而倒下的人漸漸被看見，成為新崛起的職業病。',
            ]}
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={cvd2016} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="新興職業病一：過勞"
            description={[
              '「過勞」指的是勞工在職期間因職業因素促發的心血管疾病，<u>以工時為主要認定指標</u>，2017 年 5 月發生<a href="https://www.twreporter.org/a/death-of-pxmart-labor" target="_blank">全聯羅姓員工去世</a>，即為疑似過勞個案。',
            ]}
            footnote="資料來源：職業傷病防治 104 年年報，職病管理服務中心、鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 240px)"><WorkingHours /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="高工時，高過勞風險"
            description={[
              '過勞引發原因和「高工時」有極大關係。',
              '2016 年，<u>台灣就業者平均每年總工時達 2034 小時，全球第 6 高</u>，高出 OECD 平均工時 271 個小時，台灣勞工常面臨高風險的過勞危機。',
            ]}
            footnote="資料來源：OECD、勞動部國際勞動統計／諮詢：鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={mentalDisorder2016} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="新興職業病二：職業性精神疾病"
            description={[
              '高工時造成的疾病不只是過勞。因超時工作、高壓環境而引發的精神疾病、過勞自殺等議題，也漸浮上檯面。不過台灣相關研究目前還少，通報、認定率都低。',
            ]}
            footnote="資料來源：職業傷病防治 104 年年報"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 300px)"><Image src={japanMentalDisorder} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="「職業性精神疾病」的認定難題"
            description={[
              '精神疾病致病成因多元，多數國家皆未有相關指引和補償。',
              '日本 1990 年代就注意到過勞引起的憂鬱、自殺等問題，並於 1999 年頒布「職業性精神疾病認定指引」，幾年後台、韓也跟進。',
              '2016 年，日本因職場霸凌或過勞，導致憂鬱、自殺的案件，高達 498 件。',
            ]}
            footnote="資料來源、諮詢：鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={cancer2016} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="新興職業病三：職業性癌症"
            description={[
              '2015 年歐洲職業安全衛生署（EU-OSHA）出版物指出：職業性癌症是整個歐盟得一起解決的問題。但職業性癌症的罹病暴露很少是單一因素，勞工暴露資料也搜集不易，因此通報、診斷案量都很少。',
            ]}
            footnote="資料來源：職業傷病防治 104 年年報"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={cancerRank} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="不易認定的職業性癌症"
            description={[
              '目前台灣有被認定的職業性癌症，多半都能指出與職業的明確相關性。像是吸入特定粉塵、或在器官裡驗出特定在工作場域才會出現的物質。其他類型的癌症，因不容易排除個人因素，要歸因爲職業造成，困難許多。',
            ]}
            footnote="資料來源：職業傷病防治 104 年年報"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 280px)"><Image src={threeLowBase} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox />
        ),
      },
    ],
    displayOn: [16, 19],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 280px)"><Image src={threeLow01} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="為何看不見？台灣的職業病黑數"
            description={[
              '台灣的職業病認定雖逐年上升，但整體來說仍有<u>「低通報、低認定、低補償」</u>三大困境，且又相互影響，以致於還有很多職場上的不健康情況未被看見。',
            ]}
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 280px)"><Image src={threeLow02} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="偏低的台灣職病補償率"
            description={[
              '就「已被看見、且被給付」的案件來看，<u>台灣職業病補償率遠低於國際水準，以每十萬勞保投保人口來看，台灣 2016 年僅有 7 件被補償。</u>',
              '相比之下，法國 2013 年時，補償率爲每十萬人口 385 件、瑞典 245 件；日本補償率則為 14、韓國有 48，皆高出台灣許多。',
            ]}
            footnote="資料來源、諮詢：《職業，病了嗎？》、鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 280px)"><Image src={threeLow03} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="職業病認定嚴格、舉證不易"
            description={[
              '台灣對職業病的認定較嚴格，常需要「與職業相關」的證據以供判定，因此認定率不高。例如通報案件大宗的「職業性聽力損失」，就難以舉證。「低認定」不僅代表通過不易，也間接影響了更前端的通報意願。',
            ]}
            footnote="資料來源、諮詢：《職業，病了嗎？》、鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        leave: leaveStay,
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 280px)"><Image src={threeLow04} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="被低估的「職業病們」"
            description={[
              '因低補償、低認定，職業病認定對勞工來說，流程既冗長，不一定能得到補償，導致主動通報的意願也低。目前從通報、認定到給付的數字，都仍嚴重低估。',
            ]}
            footnote="資料來源、諮詢：《職業，病了嗎？》、鄭雅文"
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={whatCanIDo} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="我得了職業病嗎？怎麼辦？"
            description={[
              '如果懷疑自己有職業病，可以諮詢<a href="http://www.tmsc.tw/center_c.php" target="_blank">各區職業傷病防治中心職醫科醫師</a>。',
              '想申請職災給付及補助，可諮詢<a href="http://www.oshlink.org.tw/about/index/3" target="_blank">台灣職業安全服務連線</a>尋求協助。',
            ]}
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: noDelayEnter,
        jsx: (
          <TextPage
            text={[
              '台灣現有的職災困境，主要來自於職災相關認定散落在不同法條中。希望改善現有補償制度，已提倡多年的《職災保險法》，也<a href="https://tsai-tracker.twreporter.org/promise?ID=9">遲遲未有進展。</a>',
              '近日《勞基法》修法頻頻，一例一休修法甚至被批是助長過勞風險，恐讓台灣離國際公約明定的「人人享有安全衛生工作環境」越來越遠。',
              '檢視職災的統計數據，不只反映出台灣勞工工作環境是否安全，更牽涉到一個國家如何關懷、保障工作者的健康，因此所有制度調整，都須持續監督。',
              `<p><a href="https://tsai-tracker.twreporter.org" target="_blank"><img src="${tsaitracker}"></img></a></p>`,
            ]}
          />
        ),
      },
    ],
  },
  {
    containerType: 'centering',
    contents: [
      {
        enter: noDelayEnter,
        jsx: (<Colophon />),
      },
    ],
  },
  // {
  //   containerType: 'centering',
  //   contents: [
  //     {
  //       jsx: (<ImageWrapper><Xxxxxxxxxxxxxxxxxxxxxxxxxxxx /></ImageWrapper>),
  //     },
  //     {
  //       jsx: (
  //         <TextBox
  //           title="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  //           description={[
  //             'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //             'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //           ]}
  //           footnote="xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  //         />
  //       ),
  //     },
  //   ],
  // },
]

export default slides
