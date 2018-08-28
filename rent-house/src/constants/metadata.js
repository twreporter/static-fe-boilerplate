// metadata of main article
const theReporter = ' - 報導者 The Reporter'
const slug = 'staging-rent-house-gcs'
export const siteURL = 'https://www.twreporter.org/'
export const titleNoOrgName = '囚租人生'
export const title = `${titleNoOrgName}${theReporter}`
export const ogDescription = '租賃產業在台灣，是高達9成房東都沒有繳稅的「地下經濟」，而且讓300萬租客愈來愈難受，不同年齡層的租屋困境正在發生⋯'
export const ogImage = `https://storage.googleapis.com/twreporter-infographics/${slug}/static/og-image.png`
export const ogUrl = `https://www.twreporter.org/i/${slug}`
export const themeColor = ''

// embeded code related
export const typeKitId = 'biq0qxh'
export const gtagId = 'UA-69336956-1'
export const fbAppId = '1296686743779808'

// metadata of each section
export const sectionTitleNoOrgName = [
  '', // for the empty introduction section
  '囚租人生',
  '年輕人租不起、老年人租不到──被夾殺的跨世代囚租族',
  '危宅裡的蝸居晚年，地下獨老何時能「上岸」',
  '危機四伏的租屋黑巿──繳租不給報稅、公安意外自己認賠',
]

export const sectionTitle = [
  `${sectionTitleNoOrgName[0]}${theReporter}`,
  `${sectionTitleNoOrgName[1]}${theReporter}`,
  `${sectionTitleNoOrgName[2]}${theReporter}`,
  `${sectionTitleNoOrgName[3]}${theReporter}`,
]

export const sectionOgUrl = [
  '', // for the empty introduction section
  ogUrl,
  'https://twreporter.pse.is/A72ZF',
  'https://twreporter.pse.is/A5F9E',
  'https://twreporter.pse.is/A8AXY',
]

// The information below are manully set in picsee, therefore they are not used by this project
export const sectionOgUrlOriginal = [
  `${ogUrl}?utm_source=renthouse&article=article1&anchorId=title1`,
  `${ogUrl}?utm_source=renthouse&article=article2&anchorId=title2`,
  `${ogUrl}?utm_source=renthouse&article=article3&anchorId=title3`,
]

export const sectionDescription = [
  '不奢求購屋，卻連租屋小確幸都成了噩夢。租不起或租不到一間好房的人，是否註定人生會一直「向下沉淪」？這是台灣現今社會最大的集體焦慮。',
  '老有所終，今日在台灣竟成奢求。在老年化社會日益嚴峻的今日，一群最需要改善居住安全與權益的老人，卻淪為租屋市場裡的人球，任由市場宰制。',
  '根據營建署調查，至今年全台尚有66萬件違章建築。在租屋黑市下，政府很難去取締那些違法隔間、具有潛在安全性疑慮的出租套房。當發生火災，租客的權益該如何被保障？'
]
