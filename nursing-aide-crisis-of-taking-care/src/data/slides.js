import Colophon from '../components/contents/colophon'
import GoToTopic from '../components/contents/go-to-topic'
import ImageWrapper from '../components/contents/static-image'
import OpeningBackground from '../components/contents/opening-background'
import OpeningStamp from '../components/contents/opening-stamp'
import OpeningWords from '../components/contents/opening-words'
import PopUp from '../components/contents/pop-up'
import React from 'react'
import styled from 'styled-components'
import TextBox from '../components/contents/text-box'
import TextPage from '../components/contents/text-page'

import graphic01 from '../../static/graphic/graphic-1.png'
import graphic02 from '../../static/graphic/graphic-2.png'
import graphic03 from '../../static/graphic/graphic-3.png'
import graphic04 from '../../static/graphic/graphic-4.png'
import graphic05 from '../../static/graphic/graphic-5.png'
import graphic06 from '../../static/graphic/graphic-6.png'
import graphic07 from '../../static/graphic/graphic-7.png'
import graphic08 from '../../static/graphic/graphic-8.png'
import graphic09 from '../../static/graphic/graphic-9.png'
import graphic10 from '../../static/graphic/graphic-10.png'
import topicImageSrc from '../../static/topic-image.jpg'

const Image = styled.img`
  width: 100%;
  height: auto;
`

const imageEnter = {
  animation: {
    opacity: [1, 0],
    translateY: [0, 0],
  },
  duration: 250,
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
  duration: 250,
  delay: 250,
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
          duration: 250,
          interruptBehavior: 'finish',
        },
        jsx: (<OpeningWords />),
      },
      {
        runOnMount: true,
        enter: {
          animation: {
            opacity: [0.7, 0],
          },
          duration: 900,
          delay: 1000,
          interruptBehavior: 'stop',
        },
        leave: {
          animation: {
            opacity: 0,
          },
          duration: 250,
          interruptBehavior: 'finish',
        },
        jsx: (<OpeningBackground />),
      },
      {
        runOnMount: true,
        enter: {
          animation: {
            opacity: [1, 0],
            scale: [1, 1.45],
            translateY: [0, '-30px'],
            translateX: [0, '20px'],
          },
          duration: 200,
          delay: 3700,
          interruptBehavior: 'stop',
        },
        leave: {
          animation: {
            opacity: 0,
          },
          duration: 250,
          interruptBehavior: 'finish',
        },
        jsx: (<OpeningStamp />),
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
              '台灣有讓國際稱羨的健保，「住院照護」卻是一個黑洞，民眾住院，看護自己找、風險自己扛。',
              '《報導者》從3張民眾住院收據，分析被隱藏在醫療帳單後的看護支出，掀開「低廉醫療」假象。',
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
        jsx: (<ImageWrapper><Image smallScreenHeight="calc(100% - 216px)" src={graphic01} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="OECD第2高的醫療費用家庭自付比"
            description={[
              '台灣健保支出佔國內生產毛額3.6%，但民眾醫療相關自費負擔日漸吃重，家庭自付費用占經常性醫療保健支出比重達36.1%，在2016年全部OECD國家中僅次南韓為第2高。',
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
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 270px)" ><Image src={graphic02} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="帳單上看不見的數字：看護費"
            description={[
              '除了自費醫材、藥材、輔具，住院最大的負擔，對很多人來說是看護及照顧服務員的費用。',
              '我們搜集民眾住院單據，都有一筆被隱藏的住院照護費，這筆必須每天「付現」的支出，連商業醫療保險也不給付。',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper><Image src={graphic04} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            compact
            title=""
            description={[
              '疾病：脊椎滑脫，進行椎間盤切除後融合及骨釘固定手術',
              '住院：5天',
              '<u>看護：$11,000（5天）</u>',
              '<u>帳單支出＋實際負擔共計：$131,019</u>',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper><Image src={graphic05} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            compact
            title=""
            description={[
              '疾病：腦瘤，手術切除',
              '住院：17天',
              '<u>看護：$11,000（5天）</u>',
              '其他：太太請假14天成本（事假無薪，估計$40,000）',
              '<u>帳單支出＋實際負擔共計：$98,928</u>',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper><Image src={graphic06} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            compact
            title=""
            description={[
              '疾病：血管性失智，因人工全髖關節置換術入院',
              '住院：6天',
              '<u>看護成本：$4,400（6天，以原僱用家庭看護每月$22,000計算）</u>',
              '自費救護車2趟：$3,200',
              '自費輪椅、護具支架：$20,000',
              '<u>帳單支出＋實際負擔共計：$38,367</u>',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 270px)" ><Image src={graphic03} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="住院請看護，每天2千起跳"
            description={[
              '《報導者》的「全台醫學中心看護大調查」統整各院看護行情，24小時費用約2,000～2,400元；12小時約為1,200～1,400元。',
              '還有許多潛規則：隔離病房、需要復健的病人要加錢，無法只請半天的看護等。',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper><Image smallScreenHeight="calc(100% - 216px)" src={graphic08} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="國人一年住院看護費逾661億"
            description={[
              '民間監督健保聯盟根據2017年健保給付資料分析，國人全年住院件數為3,297,000件，平均每件住院天數為9.55日。以一天看護費2,100元計算，看護需求規模一年高達661億元。',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper smallScreenHeight="calc(100% - 270px)" ><Image src={graphic07} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="台灣自己顧，國外卻採全責照護"
            description={[
              '台灣醫院等於把一半的照護工作交由家屬自理，家屬只能請假陪病或花錢請看護。',
              '在美、英、星、港等地施行「全責照護」，醫院自聘護佐、照服員，在護理師監督下分級照護，家屬只需探視陪伴。',
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
        leave: leaveStay,
        jsx: (
          <PopUp>
            <h3>看護費用總支出計算方式</h3>
            <p>3,297,000（全年住院件數）× 9.55（平均住院天數）× 2,100元（平均坊間每日看護費用）＝ 661億元</p>
            <p>民眾自付500元：即每日省1,600元 × 3,297,000（全年住院件數）× 9.55（平均住院天數）＝ 約省下504億元</p>
            <p>民眾自付700元：即每日省1,400元 × 3,297,000（全年住院件數）× 9.55（平均住院天數）＝ 約省下441億元</p>
            <p>以自付500元為例，就可以節省504元喔！</p>
          </PopUp>
        ),
      },
      {
        enter: imageEnter,
        jsx: (<ImageWrapper><Image src={graphic09} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="共享經濟，全責照護省很大"
            description={[
              '醫院若實行全責照護，以健保拭浴、冰敷等基礎護理估算，平均每天每床約1,500元（以人力1:4床計）。',
              '若全責照護納入健保，民眾差額負擔500元或700元，每年全民可省504億到441億元看護費。',
            ]}
            footnote=""
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
        jsx: (<ImageWrapper><Image src={graphic10} /></ImageWrapper>),
      },
      {
        jsx: (
          <TextBox
            title="納入健保，要多付多少保費？"
            description={[
              '當民眾自付500元，健保約支出315億；若付700元，健保約支出252億。以前者計算，增加的健保支出若全由民眾埋單，每月保費約多114元；若與政府、雇主按比例分攤，民眾每月約多付42.2元保費。',
            ]}
            footnote=""
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
            title="「住院孤兒」時代在即，誰來照護病床前的我們？"
            text={[
              '高齡化和少子化下，無人陪病的「住院孤兒」將愈來愈多，住院只能仰賴看護。',
              '有一天，當你生病時，花不花得起錢請看護？誰來當你的看護？醫院住院照護缺的一角，台灣何時能補上，不再拖垮許多家庭、甚至全體社會？',
            ]}
          >
            <GoToTopic
              href="https://www.twreporter.org/topics/nursing-aide-crisis-of-taking-care"
              imageSrc={topicImageSrc}
              prefix="完整專題請見：【病床邊的照護危機：一年660億住院看護需求，誰來把關？】"
              shortPrefix="看完整專題：病床邊的照護危機"
            />
          </TextPage>
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
]

export default slides
