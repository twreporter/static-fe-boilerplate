const path = require('path')

const distPathname = 'dist'
const staticPathname = 'static'

const productionOrigin = 'https://storage.googleapis.com/twreporter-infographics/occupational-diseases-in-taiwan-gcs'
const productionDistHrefBase = `${productionOrigin}/${distPathname}`
const productionStaticHrefBase = `${productionOrigin}/${staticPathname}`

const localDistDir = path.resolve(__dirname, distPathname)
const localStaticDir = path.resolve(__dirname, staticPathname)

module.exports = {
  localDistDir,
  localStaticDir,
  productionOrigin,
  productionStaticHrefBase,
  productionDistHrefBase,
}
