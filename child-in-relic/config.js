const path = require('path')

const outputFolder = 'dist'

const staticPublicPath = '/static'
const baseUri = 'https://storage.googleapis.com/twreporter-infographics/high-risk-youth-life-is-a-struggle'

module.exports = {
  outputFolder,
  outputPath: path.resolve(__dirname, `./${outputFolder}`),
  staticPublicPath,
  baseUri,
}
