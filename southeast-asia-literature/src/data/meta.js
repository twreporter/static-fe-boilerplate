import config from '../../config.json'

const slug = config.PROJECT_NAME

const pageMeta = {
  title: '聽見赤道二三五的文學之聲 - 報導者 The Reporter',
  description: '《報導者》邀請紅樓詩社「赤道二三五：東南亞文學論壇」其中五位作家，包括泰國、緬甸、越南、馬來西亞與菲律賓，親自朗讀各自的創作，透過視覺與聽覺，進入他們的文學創作世界。',
  ogImage: `https://storage.googleapis.com/twreporter-infographics/${slug}-gcs/static/og-image.jpg`,
  ogUrl: `https://www.twreporter.org/i/${slug}-gcs`,
}

export default pageMeta
