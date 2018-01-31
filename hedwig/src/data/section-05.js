import illustrator05Desktop from '../../static/illustrator-05-desktop.jpg'
import illustrator05Mobile from '../../static/illustrator-05-mobile.jpg'
import illustrator05Tablet from '../../static/illustrator-05-tablet.jpg'

export default {
  author: {
    name: '謝承佑',
    jobTitle: '展場設計師',
    country: '德國',
    email: 'michaelyo@livemail.tw',
    website: '',
  },
  illustration: {
    image: {
      resizedTargets: {
        mobile: illustrator05Mobile,
        tablet: illustrator05Tablet,
        desktop: illustrator05Desktop,
      },
      alt: '',
    },
    materials: '原子筆、彩色鉛筆、簽字筆',
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
        '我覺得Hedwig這個角色擁有一個莊嚴而強大的靈魂，他面對顛沛的生命用他的熱情和堅持去戰鬥，這是他在我心中最強烈的印象也是我畫畫時最初的靈感。',
      ],
    },
    {
      question: 'Q2. 在《搖滾芭比》這部電影裡，最讓你感動與留下深刻印象的是什麼？',
      answer: [
        '我最喜歡電影裡的一首歌〈Origin of Love〉，我覺得整部電影透過這首歌告訴作為渺小人類的我們如果要從巨大的宿命及諸神的掌控中獲取自由的唯一方法，就是去學會愛人及被愛，這也是我認為每個人生命中最重要的課題。',
      ],
    },
    {
      question: 'Q3. 在你的生命裡，影響你最大的人是誰？',
      answer: [
        '這題還沒有答案。',
      ],
    },
  ],
}

