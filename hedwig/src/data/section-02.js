import illustrator02Desktop from '../../static/illustrator-02-desktop.jpg'
import illustrator02Mobile from '../../static/illustrator-02-mobile.jpg'
import illustrator02Tablet from '../../static/illustrator-02-tablet.jpg'

const section02 = {
  author: {
    name: 'Acia yang',
    jobTitle: '圖像創作者',
    country: '比利時',
    email: 'bihuayang@hotmail.com',
    website: 'cargocollective.com/bihuayang',
  },
  illustration: {
    image: {
      resizedTargets: {
        mobile: {
          path: illustrator02Mobile,
          width: 306,
          height: 217,
        },
        tablet: {
          path: illustrator02Tablet,
          width: 640,
          height: 453,
        },
        desktop: {
          path: illustrator02Desktop,
          width: 769,
          height: 544,
        },
        hd: {
          path: illustrator02Desktop,
          width: 1136,
          height: 804,
        },
      },
      alt: '',
    },
    materials: '鉛筆、壓克力',
    size: {
      height: '19cm',
      width: '27cm',
    },
    comment: '＊此作品可供販售（原畫）欲購買者請以電郵與繪者聯絡',
  },
  interviews: [
    {
      question: 'Q1. 為什麼你選擇畫下這樣的Hedwig？',
      answer: [
        '從電影開場的造型，緊接著下一幕在Hewdig房間，塞滿了各式各樣的假髮，從這就看出Hedwig瘋狂帶點神經質的個性。他打扮成女人，畫起濃妝，但在電影的最後一幕，全身赤裸走在暗黑的小巷，這時不管是男人還是女人，他的身體及心靈得到莫大的自由。',
        '這樣的轉變，不管是外表上還是心境上，我將他們畫在一起，像照鏡子般同時存在著，Hedwig或許曾經無法接受自己，但最後坦然面對，兩者都是緊緊靠在一起的，都是勇敢追愛，真實自我的Hedwig。',
      ],
    },
    {
      question: 'Q2. 在《搖滾芭比》這部電影裡，最讓你感動與留下深刻印象的是什麼？',
      answer: ['有兩幕。第一是Tommy對Hedwig唱著〈Wicked Little Town〉，Hedwig拋開一切，用男人的樣子面對Tommy而留下眼淚。第二是Hedwig化身為Tommy模樣所唱的最後一首歌〈Midnight Radio〉，歌詞裡提到 「呼吸，感覺，愛情，獻出自由，你靈魂知道，就像血液知道，從心到腦的路徑，知道你的全部」，我感受到不管人生曾經做了哪些選擇，既使無法預知成與敗，結果或許伴隨著難過及懊悔，甚至沒有勇氣去誠實面對，唯有接受自己心才能更自由。'],
    },
    {
      question: 'Q3. 在你的生命裡，影響你最大的人是誰？',
      answer: ['大學一位同志好友。他是第一個讓我了解同志的世界，我們從18歲認識，從那時我才發現有些人先天就跟自己不太一樣，也開始學會用同理心及平等的方式對待每個人。'],
    },
  ],
}

export default section02
