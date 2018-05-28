import { fbAppId } from '../constants/metadata'

export function buildFbShareLink(url) {
  const display = 'page'
  const encodedUrl = encodeURIComponent(url)
  const encodedRedirectUri = encodeURIComponent('https://www.twreporter.org/topics/2018-fifa-world-cup-1')
  return `https://www.facebook.com/dialog/feed?app_id=${fbAppId}&display=${display}&link=${encodedUrl}&redirect_uri=${encodedRedirectUri}`
}
