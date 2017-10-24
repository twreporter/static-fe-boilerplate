const path = require('path')

const outputFolder = 'dist'

const staticPublicPath = '/static/'

module.exports = {
  outputFolder,
  outputPath: path.resolve(__dirname, `./${outputFolder}`),
  staticPublicPath,
}
