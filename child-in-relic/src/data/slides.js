import { FullpageSlidesConstants } from '@twreporter/react-components/lib/fullpage-slides'
import { cinemagraph001, cinemagraph003, cinemagraph009, cinemagraph024 } from './cinemagraph'
import * as subtitles from './subtitles'

import mobileBg002 from '../../static/mobile/mobile-002-768x1024-bg.jpg'
import mobileBg004 from '../../static/mobile/mobile-004-768x1024-bg.jpg'
import mobileBg005 from '../../static/mobile/mobile-005-768x1024-bg.jpg'
import mobileBg006 from '../../static/mobile/mobile-006-768x1024-bg.jpg'
import mobileBg007 from '../../static/mobile/mobile-007-768x1024-bg.jpg'
import mobileBg008 from '../../static/mobile/mobile-008-768x1024-bg.jpg'
import mobileBg010 from '../../static/mobile/mobile-010-768x1024-bg.jpg'
import mobileBg011 from '../../static/mobile/mobile-011-768x1024-bg.jpg'
import mobileBg012 from '../../static/mobile/mobile-012-768x1024-bg.jpg'
import mobileBg013 from '../../static/mobile/mobile-013-768x1024-bg.jpg'
import mobileBg014 from '../../static/mobile/mobile-014-768x1024-bg.jpg'
import mobileBg015 from '../../static/mobile/mobile-015-768x1024-bg.jpg'
import mobileBg016 from '../../static/mobile/mobile-016-768x1024-bg.jpg'
import mobileBg017 from '../../static/mobile/mobile-017-768x1024-bg.jpg'
import mobileBg018 from '../../static/mobile/mobile-018-768x1024-bg.jpg'
import mobileBg019 from '../../static/mobile/mobile-019-768x1024-bg.jpg'
import mobileBg020 from '../../static/mobile/mobile-020-768x1024-bg.jpg'
import mobileBg021 from '../../static/mobile/mobile-021-768x1024-bg.jpg'
import mobileBg022 from '../../static/mobile/mobile-022-768x1024-bg.jpg'
import mobileBg023 from '../../static/mobile/mobile-023-768x1024-bg.jpg'

import tabletBg002 from '../../static/tablet/tablet-002-1024x1024-bg.jpg'
import tabletBg004 from '../../static/tablet/tablet-004-1024x1024-bg.jpg'
import tabletBg005 from '../../static/tablet/tablet-005-1024x1024-bg.jpg'
import tabletBg006 from '../../static/tablet/tablet-006-1024x1024-bg.jpg'
import tabletBg007 from '../../static/tablet/tablet-007-1024x1024-bg.jpg'
import tabletBg008 from '../../static/tablet/tablet-008-1024x1024-bg.jpg'
import tabletBg010 from '../../static/tablet/tablet-010-1024x1024-bg.jpg'
import tabletBg011 from '../../static/tablet/tablet-011-1024x1024-bg.jpg'
import tabletBg012 from '../../static/tablet/tablet-012-1024x1024-bg.jpg'
import tabletBg013 from '../../static/tablet/tablet-013-1024x1024-bg.jpg'
import tabletBg014 from '../../static/tablet/tablet-014-1024x1024-bg.jpg'
import tabletBg015 from '../../static/tablet/tablet-015-1024x1024-bg.jpg'
import tabletBg016 from '../../static/tablet/tablet-016-1024x1024-bg.jpg'
import tabletBg017 from '../../static/tablet/tablet-017-1024x1024-bg.jpg'
import tabletBg018 from '../../static/tablet/tablet-018-1024x1024-bg.jpg'
import tabletBg019 from '../../static/tablet/tablet-019-1024x1024-bg.jpg'
import tabletBg020 from '../../static/tablet/tablet-020-1024x1024-bg.jpg'
import tabletBg021 from '../../static/tablet/tablet-021-1024x1024-bg.jpg'
import tabletBg022 from '../../static/tablet/tablet-022-1024x1024-bg.jpg'
import tabletBg023 from '../../static/tablet/tablet-023-1024x1024-bg.jpg'

import desktopBg002 from '../../static/desktop/desktop-002-1440x960-bg.jpg'
import desktopBg004 from '../../static/desktop/desktop-004-1440x960-bg.jpg'
import desktopBg005 from '../../static/desktop/desktop-005-1440x960-bg.jpg'
import desktopBg006 from '../../static/desktop/desktop-006-1440x960-bg.jpg'
import desktopBg007 from '../../static/desktop/desktop-007-1440x960-bg.jpg'
import desktopBg008 from '../../static/desktop/desktop-008-1440x960-bg.jpg'
import desktopBg010 from '../../static/desktop/desktop-010-1440x960-bg.jpg'
import desktopBg011 from '../../static/desktop/desktop-011-1440x960-bg.jpg'
import desktopBg012 from '../../static/desktop/desktop-012-1440x960-bg.jpg'
import desktopBg013 from '../../static/desktop/desktop-013-1440x960-bg.jpg'
import desktopBg014 from '../../static/desktop/desktop-014-1440x960-bg.jpg'
import desktopBg015 from '../../static/desktop/desktop-015-1440x960-bg.jpg'
import desktopBg016 from '../../static/desktop/desktop-016-1440x860-bg.jpg'
import desktopBg017 from '../../static/desktop/desktop-017-1440x960-bg.jpg'
import desktopBg018 from '../../static/desktop/desktop-018-1440x960-bg.jpg'
import desktopBg019 from '../../static/desktop/desktop-019-1440x960-bg.jpg'
import desktopBg020 from '../../static/desktop/desktop-020-1440x960-bg.jpg'
import desktopBg021 from '../../static/desktop/desktop-021-1440x810-bg.jpg'
import desktopBg022 from '../../static/desktop/desktop-022-1440x960-bg.jpg'
import desktopBg023 from '../../static/desktop/desktop-023-1440x960-bg.jpg'

import related01 from '../../static/related-01.jpg'
import related02 from '../../static/related-02.jpg'
import topicLandingMobile from '../../static/topic-landing-mobile.jpg'
import topicLandingTablet from '../../static/topic-landing-tablet.jpg'

import soundWorkEarly from '../../static/sound/05-work-early.mp3'
import soundPoisoned from '../../static/sound/09-poisoned.mp3'
import soundAboutSalary from '../../static/sound/12-about-salary.mp3'
import soundSpecial from '../../static/sound/20-special.mp3'
import soundFutureEnding from '../../static/sound/24-future-ending.mp3'

const { BG_TYPES, CONTENT_TYPES, TEXT_BOX_POSITIONS } = FullpageSlidesConstants

const slides = [
  {
    contentType: CONTENT_TYPES.TITLE_LEFT,
    showNextPageButton: false,
    content: {
      subtitle: '廢墟裡的少年',
      title: '15歲起我這樣養活自己',
      date: '2017.10.23',
    },
    backgroundType: BG_TYPES.CINEMAGRAPH,
    background: {
      cinemagraphLayers: cinemagraph001.getAllLayerData(),
      bgColor: 'black',
      isParallel: false,
    },
  },
  {
    contentType: CONTENT_TYPES.TEXT_BOX,
    showNextPageButton: true,
    buttonTheme: 'bright',
    content: {
      title: '被迫自立的少年',
      htmlContent:
        '<p>這是一個少年土豆噴農藥的故事。這樣欠缺家庭溫暖與學校社會網絡資源的少年「土豆們」，為數不少，都隱身在我們之中。他們每一天都在與命運搏鬥。</p>',
      textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
    },
    backgroundType: BG_TYPES.COLOR,
    background: {
      bgColor: '#2c2c2c',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '15歲那年，父親和阿嬤相繼過世，那一刻起，土豆靠自己活下去。水泥工、上山拔菜，什麼粗活都做過。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg002,
          tablet: tabletBg002,
          desktop: desktopBg002,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '土豆的房間堆滿他夾來的娃娃，每天夜裡就是這些娃娃陪他睡覺。',
    },
    backgroundType: BG_TYPES.CINEMAGRAPH,
    background: {
      cinemagraphLayers: cinemagraph003.getAllLayerData(),
      bgColor: 'black',
      isParallel: true,
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '空蕩的祖厝老舊，房子一隅有廢棄的灶。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg004,
          tablet: tabletBg004,
          desktop: desktopBg004,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.TEXT_BOX,
    showNextPageButton: false,
    content: {
      title: '經濟壓迫的代價',
      htmlContent:
        '<p>雲林有全台密度最高的農藥代噴車，噴藥的清一色是年輕面孔。有時噴完藥，全身灼熱，想吐。會想辦法灌牛奶或吊點滴解毒。</p>',
      textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
    },
    backgroundType: BG_TYPES.COLOR,
    background: {
      bgColor: '#2c2c2c',
    },
  },
  {
    contentType: CONTENT_TYPES.AUDIO,
    showNextPageButton: false,
    content: {
      audioSrc: soundWorkEarly,
      subtitles: subtitles.workEarly,
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg005,
          tablet: tabletBg005,
          desktop: desktopBg005,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '土豆一天幾乎只吃兩餐，早餐是必吃的一餐。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg006,
          tablet: tabletBg006,
          desktop: desktopBg006,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '拿到農民給的農藥，土豆可以馬上知道配方比例，同時也知道農藥毒性。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg007,
          tablet: tabletBg007,
          desktop: desktopBg007,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '助手得顧好管線，如果管線纏住或破損，不僅無法工作，還要花錢修補。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg008,
          tablet: tabletBg008,
          desktop: desktopBg008,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.AUDIO,
    showNextPageButton: false,
    content: {
      audioSrc: soundPoisoned,
      subtitles: subtitles.poisoned,
    },
    backgroundType: BG_TYPES.CINEMAGRAPH,
    background: {
      cinemagraphLayers: cinemagraph009.getAllLayerData(),
      bgColor: 'black',
      isParallel: true,
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '即便師傅再有經驗，一天工作下來，他們的肺部和身體還是沾染許多溢散的藥劑。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg010,
          tablet: tabletBg010,
          desktop: desktopBg010,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '工作結束後，他們要洗淨藥桶及車子，更要趕緊沖洗身體。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg011,
          tablet: tabletBg011,
          desktop: desktopBg011,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.AUDIO,
    showNextPageButton: false,
    content: {
      audioSrc: soundAboutSalary,
      subtitles: subtitles.aboutSalary,
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg012,
          tablet: tabletBg012,
          desktop: desktopBg012,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '噴藥工作都是每日領現，也因此收入很難存下來，有時當天賺的當天就會花完。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg013,
          tablet: tabletBg013,
          desktop: desktopBg013,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.TEXT_BOX,
    showNextPageButton: false,
    content: {
      title: '孤零零的「家」',
      htmlContent: '<p>結束工作回到家裡，便孑然一身。朋友是他的寄託，遇到困難，彼此扶持。</p>',
      textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
    },
    backgroundType: BG_TYPES.COLOR,
    background: {
      bgColor: '#2c2c2c',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '工作結束後，土豆常跟朋友泡在一起，吃飯、聊天、夾娃娃，打發時間。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg014,
          tablet: tabletBg014,
          desktop: desktopBg014,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '夾娃娃是土豆的消遣，只要夾到想要的，就很有成就感也抒壓。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg015,
          tablet: tabletBg015,
          desktop: desktopBg015,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '土豆夾娃娃的技巧已經練到有口皆碑，然而背後是一次又一次的金錢投注。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg016,
          tablet: tabletBg016,
          desktop: desktopBg016,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '有空時候，土豆一定會跟朋友聯絡往外跑，很少一個人待在家。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg017,
          tablet: tabletBg017,
          desktop: desktopBg017,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '大家常常找一家店吃東西、喝飲料，聊天、打屁、殺時間。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg018,
          tablet: tabletBg018,
          desktop: desktopBg018,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '只要有什麼好康有趣的，土豆的朋友圈就會分享相邀，然後大家一起去玩。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg019,
          tablet: tabletBg019,
          desktop: desktopBg019,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.AUDIO,
    showNextPageButton: false,
    content: {
      audioSrc: soundSpecial,
      subtitles: subtitles.special,
      iconTheme: 'dark',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg020,
          tablet: tabletBg020,
          desktop: desktopBg020,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.BLANK,
    showNextPageButton: true,
    buttonTheme: 'dark',
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg021,
          tablet: tabletBg021,
          desktop: desktopBg021,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '回到家後土豆幾乎就掛在網上，不是打手遊就是線上聊天。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg022,
          tablet: tabletBg022,
          desktop: desktopBg022,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.TEXT_BOX,
    showNextPageButton: false,
    content: {
      title: '渴望屬於自己的家',
      htmlContent: '<p>太早進入社會，也太過疲憊，已放棄復學的可能。活著，是他每天的功課。</p>',
      textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
    },
    backgroundType: BG_TYPES.COLOR,
    background: {
      bgColor: '#2c2c2c',
    },
  },
  {
    contentType: CONTENT_TYPES.CAPTION,
    showNextPageButton: false,
    content: {
      caption: '土豆過去成績不錯，但家境轉變已讓他回不去學業這條路。',
    },
    backgroundType: BG_TYPES.IMAGE,
    background: {
      bgImage: {
        resizedTargets: {
          mobile: mobileBg023,
          tablet: tabletBg023,
          desktop: desktopBg023,
        },
      },
      bgColor: 'black',
    },
  },
  {
    contentType: CONTENT_TYPES.AUDIO,
    showNextPageButton: false,
    content: {
      audioSrc: soundFutureEnding,
      subtitles: subtitles.aboutFuture,
    },
    backgroundType: BG_TYPES.CINEMAGRAPH,
    background: {
      cinemagraphLayers: cinemagraph024.getAllLayerData(),
      bgColor: 'black',
      isParallel: true,
    },
  },
  {
    contentType: CONTENT_TYPES.TEXT_BOX,
    showNextPageButton: false,
    content: {
      title: '',
      htmlContent: '<p>在報導刊出前夕，土豆告知將離開噴灑農藥這一行，並另尋一份穩當安全的工作。</p>',
      textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
    },
    backgroundType: BG_TYPES.COLOR,
    background: {
      bgColor: '#2c2c2c',
    },
  },
  {
    contentType: CONTENT_TYPES.COLOPHON,
    showNextPageButton: false,
    content: {
      topicTitle: '廢墟裡的少年・專題報導',
      topicImage: {
        mobile: topicLandingMobile,
        tablet: topicLandingTablet,
        desktop: topicLandingTablet,
      },
      topicLink: 'https://www.twreporter.org/topics/high-risk-youth-left-in-relic',
      relateds: [
        {
          title: '廢墟裡的少年——兩萬名被遺忘的高風險家庭孩子們',
          to: 'https://www.twreporter.org/a/high-risk-youth-left-in-relic',
          imageSrc: related01,
        },
        {
          title: '【台灣篇】飛夢林搭屋，給脫隊生家的溫暖',
          to: 'https://www.twreporter.org/a/high-risk-youth-family-youth',
          imageSrc: related02,
        },
      ],
      team: [
        {
          job: '攝影',
          members: ['余志偉', '林佑恩'],
        },
        {
          job: '文字',
          members: ['李雪莉', '余志偉'],
        },
        {
          job: '專案管理',
          members: ['陳貞樺'],
        },
        {
          job: '設計',
          members: ['黃禹禛'],
        },
        {
          job: '工程',
          members: ['余崇任'],
        },
        {
          job: '監製',
          members: ['李雪莉'],
        },
      ],
    },
    backgroundType: BG_TYPES.COLOR,
    background: {
      bgColor: '#2c2c2c',
    },
  },
]

export default slides
