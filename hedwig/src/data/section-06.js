import illustrator06Desktop from '../../static/illustrator-06-desktop.jpg'
import illustrator06Mobile from '../../static/illustrator-06-mobile.jpg'
import illustrator06Tablet from '../../static/illustrator-06-tablet.jpg'

export default {
  author: {
    name: '鄭涵文',
    jobTitle: '記者',
    country: '台灣',
    email: '',
    website: '',
  },
  illustration: {
    image: {
      resizedTargets: {
        mobile: illustrator06Mobile,
        tablet: illustrator06Tablet,
        desktop: illustrator06Desktop,
      },
      alt: '',
    },
    materials: '色鉛筆、油漆筆',
    size: {
      height: '21cm',
      width: '29.7cm',
    },
    comment: '',
  },
  interviews: [
    {
      question: 'Q1. 為什麼你選擇畫下這樣的Hedwig？',
      answer: [
        '之所以選擇一次畫下兩種面貌的Hedwig，是因兩種樣子展演了他的不同狀態。在世間走跳已經很難，而Hedwig儘管歷經各種看似荒誕實而沈重的傷痛，看上去仍能那樣不羈且迷人，作為觀影者，會被迷住，也同時心疼他。',
      ],
    },
    {
      question: 'Q2. 電影裡Hedwig找到自己兒時日記，發現了許多影響他的人。在你的生命裡，影響你最大的人是誰？',
      answer: [
        '因為自己是不喜衝突的阿孬性格，所以人生幾乎是被自己所在乎的人全面影響著，任性的自己算是被壓得滿渺小的。',
      ],
    },
    {
      question: 'Q3. 在《搖滾芭比》這部電影裡，最讓你感動與留下深刻印象的是什麼？',
      answer: [
        'Hedwig最觸動我的，是不論如何被薄情對待、或不被接受，在暴烈的歌詞或狂放的肢體之下，他心底依舊溫柔。',
      ],
    },
  ],
}

