const path = require('path')

const outputFolder = 'dist'

module.exports = {
  outputFolder,
  outputPath: path.resolve(__dirname, outputFolder),
}
