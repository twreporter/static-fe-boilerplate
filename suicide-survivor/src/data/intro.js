import pathProcessor from '../utils/path-processor'

const intro = {
  title: {
    rowOne: '倖存者的餘聲——',
    rowTwo: '自殺者遺族的漫長旅途',
  },
  image: {
    resizedTargets: {
      mobile: pathProcessor('coverphoto_mobile.jpg'),
      tablet: pathProcessor('coverphoto_tablet.jpg'),
      desktop: pathProcessor('coverphoto_desktop.jpg'),
    },
  },
  credits: [
    {
      jobTitle: '文',
      members: [
        {
          name: '張子午',
          linkTo: 'https://www.twreporter.org/author/571de7badae62379576d7f3e',
        },
      ],
    },
    {
      jobTitle: '攝影',
      members: [
        {
          name: '曾原信',
          linkTo: 'https://www.twreporter.org/author/5757f8498e4c2b171bcaf7d8',
        },
      ],
    },
  ],
  content: [
    '台灣自殺率在2001年首度達到每10萬人中11.7人，此後未曾低於全球平均（11.4人／10萬人，根據<a target="_blank" href="http://www.who.int/mental_health/suicide-prevention/exe_summary_chinese.pdf?ua=1">2013年WHO報告</a>），更在2005年和2006年連續兩年達到每10萬人中16.6人和16.8人，在全球自殺版圖中列入高自殺率國家之林（≥15人／10萬人）。因應自殺率居高不下的問題，政府在2005年設立自殺防治中心，但至今每年依舊有3到4千人自殺死亡。',
    '對於自殺議題的關注，絕大多數僅停留在自殺者身上，化作研究統計數字、成為媒體標題下的悲劇或傳奇，但在每個棄世而去者背後，都站立著更多不被看見的生者，猶如無聲的影子，他們被烙下永遠的印記——自殺者遺族。',
    '每年感恩節的前一天，也是11月第3個週六是「世界自殺遺族關懷日」，《報導者》走入三位自殺者遺族的世界，透過不同階段的哀傷歷程，看見掩蓋在迷思與禁忌下的真實經驗，他們分別錄下「現在的自己」對逝去親人說的話，邀請讀者留駐聆聽，那些不因死亡而被切斷的生命連結。最後，我們從自殺防治專業者的觀點，探究現階段自殺者遺族支持體系的諸多挑戰與可行模式。',
  ],
}

export default intro
