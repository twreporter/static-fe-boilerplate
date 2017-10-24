// const slides = [
//   {
//     contentType: CONTENT_TYPES.TITLE_LEFT,
//     content: {
//       subtitle: '廢墟裡的少年',
//       title: '15歲起我這樣養活自己',
//       date: '2017.10.23',
//     },
//     backgroundType: BG_TYPES.CINEMAGRAPH,
//     background: {
//       cinemagraphLayers: cinemagraph001.getAllLayerData(),
//       bgColor: 'black',
//       isParallel: false,
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.TEXT_BOX,
//     content: {
//       title: '被迫自立的少年',
//       htmlContent: '<p>15歲那年，父親和阿嬤相繼過世，那一刻起，他靠自己活下去。一開始做水泥工、上山拔菜，後來做起農藥代噴。就這樣過了兩年多。</p>',
//       textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
//     },
//     backgroundType: BG_TYPES.COLOR,
//     background: {
//       bgColor: '#2c2c2c',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '牆上掛著阿公、阿嬤和父親的遺照，土豆已沒有照顧他的大人。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg002,
//           tablet: desktopBg002,
//           desktop: desktopBg002,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '土豆的房間堆滿他夾來的娃娃，每天夜裡就是這些娃娃陪他睡覺。',
//     },
//     backgroundType: BG_TYPES.CINEMAGRAPH,
//     background: {
//       cinemagraphLayers: cinemagraph003.getAllLayerData(),
//       bgColor: 'black',
//       isParallel: true,
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '空蕩的祖厝老舊，房子一隅有廢棄的灶。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg004,
//           tablet: desktopBg004,
//           desktop: desktopBg004,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.TEXT_BOX,
//     content: {
//       title: '經濟壓迫的代價',
//       htmlContent: '<p>雲林有全台密度最高的農藥代噴車，噴藥的清一色是年輕面孔。有時噴完藥，全身灼熱，想吐。會想辦法灌牛奶或吊點滴解毒。</p>',
//       textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
//     },
//     backgroundType: BG_TYPES.COLOR,
//     background: {
//       bgColor: '#2c2c2c',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.AUDIO,
//     content: {
//       audioSrc: soundWorkEarly,
//       subtitles: subtitlesWorkEarly,
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg004,
//           tablet: desktopBg004,
//           desktop: desktopBg004,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '土豆一天幾乎只吃兩餐，早餐是必吃的一餐。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg005,
//           tablet: desktopBg005,
//           desktop: desktopBg005,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '拿到農民給的農藥，土豆就可以馬上知道配方比例，同時也知道農藥毒性，自己要多提防。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg006,
//           tablet: desktopBg006,
//           desktop: desktopBg006,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '助手得顧好管線，如果管線纏住或破損，不僅無法工作，還要花錢修補。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg007,
//           tablet: desktopBg007,
//           desktop: desktopBg007,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '有經驗的師傅會依風勢作業，否則自己跟助手都可能因吃藥過多而中毒。',
//     },
//     // contentType: CONTENT_TYPES.AUDIO,
//     // content: {
//     //   audioSrc: soundPoisoned,
//     //   subtitles: subtitlesPoisoned,
//     // },
//     backgroundType: BG_TYPES.CINEMAGRAPH,
//     background: {
//       cinemagraphLayers: cinemagraph009.getAllLayerData(),
//       bgColor: 'black',
//       isParallel: true,
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '即便師傅再有經驗，一天工作下來，他們的肺部和身體還是沾染許多溢散的藥劑。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg009,
//           tablet: desktopBg009,
//           desktop: desktopBg009,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '工作結束後，他們要洗淨藥桶及車子，更要趕緊沖洗身體。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg010,
//           tablet: desktopBg010,
//           desktop: desktopBg010,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.AUDIO,
//     content: {
//       audioSrc: soundAboutSalary,
//       subtitles: subtitlesAboutSalary,
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg011,
//           tablet: desktopBg011,
//           desktop: desktopBg011,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '噴藥工作都是每日領現，也因此收入很難存下來，有時當天賺的當天就會花完。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg012,
//           tablet: desktopBg012,
//           desktop: desktopBg012,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.TEXT_BOX,
//     content: {
//       title: '孤零零的「家」',
//       htmlContent: '<p>結束工作回到家裡，便孑然一身。朋友是他的寄託，遇到困難，彼此扶持。</p>',
//       textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
//     },
//     backgroundType: BG_TYPES.COLOR,
//     background: {
//       bgColor: '#2c2c2c',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '工作結束後，土豆常跟朋友泡在一起，吃飯、聊天、夾娃娃，打發時間。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg013,
//           tablet: desktopBg013,
//           desktop: desktopBg013,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '夾娃娃是土豆的消遣，只要夾到想要的，就很有成就感也抒壓。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg014,
//           tablet: desktopBg014,
//           desktop: desktopBg014,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '土豆夾娃娃的技巧已經練到有口皆碑，然而背後是一次又一次的金錢投注。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg015,
//           tablet: desktopBg015,
//           desktop: desktopBg015,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '有空時候，土豆一定會跟朋友聯絡往外跑，很少一個人待在家。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg016,
//           tablet: desktopBg016,
//           desktop: desktopBg016,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '大家常常找一家店吃東西、喝飲料，聊天、打屁、殺時間。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg017,
//           tablet: desktopBg017,
//           desktop: desktopBg017,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '只要有什麼好康有趣的，土豆的朋友圈就會分享相邀，然後大家一起去玩。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg018,
//           tablet: desktopBg018,
//           desktop: desktopBg018,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.BLANK,
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg019,
//           tablet: desktopBg019,
//           desktop: desktopBg019,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.BLANK,
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg020,
//           tablet: desktopBg020,
//           desktop: desktopBg020,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '回到家後土豆幾乎就掛在網上，不是打手遊就是線上聊天。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg021,
//           tablet: desktopBg021,
//           desktop: desktopBg021,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.TEXT_BOX,
//     content: {
//       title: '渴望屬於自己的家',
//       htmlContent: '<p>太早進入社會，也太過疲憊，已放棄復學的可能。活著，是他每天的功課</p>',
//       textBoxPosition: TEXT_BOX_POSITIONS.CENTER_CENTER,
//     },
//     backgroundType: BG_TYPES.COLOR,
//     background: {
//       bgColor: '#2c2c2c',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.CAPTION,
//     content: {
//       caption: '土豆過去成績不錯，但家境轉變已讓他回不去學業這條路。',
//     },
//     backgroundType: BG_TYPES.IMAGE,
//     background: {
//       bgImage: {
//         resizedTargets: {
//           mobile: desktopBg022,
//           tablet: desktopBg022,
//           desktop: desktopBg022,
//         },
//       },
//       bgColor: 'black',
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.AUDIO,
//     content: {
//       audioSrc: soundFutureEnding,
//       subtitles: subtitlesFuture,
//     },
//     backgroundType: BG_TYPES.CINEMAGRAPH,
//     background: {
//       cinemagraphLayers: cinemagraph024.getAllLayerData(),
//       bgColor: 'black',
//       isParallel: true,
//     },
//   },
//   {
//     contentType: CONTENT_TYPES.COLOPHON,
//     content: {
//       topicTitle: '廢墟少年，活下去都是場戰鬥',
//       topicImage: {
//         mobile: desktopBg000,
//         tablet: desktopBg000,
//         desktop: desktopBg000,
//       },
//       relateds: [
//         {
//           title: '律師：看過「色情報復」被害人的痛苦，就再也無法看熱鬧了',
//           to: '',
//           imageSrc: desktopBg001,
//         },
//         {
//           title: '律師：看過「色情報復」被害人的痛苦，就再也無法看熱鬧了',
//           to: '',
//           imageSrc: desktopBg002,
//         },
//       ],
//       team: [
//         {
//           job: '攝影',
//           members: ['余志偉', '林佑恩'],
//         },
//         {
//           job: '文字',
//           members: ['李雪莉', '余志偉'],
//         },
//         {
//           job: '專案管理',
//           members: ['陳貞樺'],
//         },
//         {
//           job: '設計',
//           members: ['黃禹禛'],
//         },
//         {
//           job: '工程',
//           members: ['余崇任'],
//         },
//         {
//           job: '監製',
//           members: ['李雪莉'],
//         },
//       ],
//     },
//     backgroundType: BG_TYPES.COLOR,
//     background: {
//       bgColor: '#2c2c2c',
//     },
//   },
//   // {
//   //   contentType: CONTENT_TYPES.TEXT_BOX,
//   //   content: {
//   //     title: '大問北動小，有於一文',
//   //     htmlContent: '<p>就計得過象，的不他裡往能身導為寫野內為我；金他極高而統傳代間有院模要景慢人候者，得車詩為簡西回大去。</p>',
//   //     textBoxPosition: TEXT_BOX_POSITIONS.LEFT_BOTTOM,
//   //   },
//   //   backgroundType: BG_TYPES.IMAGE,
//   //   background: {
//   //     bgImage: {
//   //       resizedTargets: {
//   //         mobile: desktopBg003,
//   //         tablet: desktopBg003,
//   //         desktop: desktopBg003,
//   //       },
//   //     },
//   //     bgColor: 'black',
//   //   },
//   // },
//   // {
//   //   contentType: CONTENT_TYPES.SLOGAN,
//   //   content: {
//   //     slogan: '大問北動小，有於一：可回長冷紅一部突中際',
//   //     htmlContent: '',
//   //   },
//   //   backgroundType: BG_TYPES.IMAGE,
//   //   background: {
//   //     bgImage: {
//   //       resizedTargets: {
//   //         mobile: desktopBg004,
//   //         tablet: desktopBg004,
//   //         desktop: desktopBg004,
//   //       },
//   //     },
//   //     bgColor: 'black',
//   //   },
//   // },
// ]
