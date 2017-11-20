const path = require('path')

const productoinHostAndPath = 'https://storage.googleapis.com/twreporter-infographics/walk-with-survivor-of-suicide-gcs/static/'

const pathProcessor = (fileName) => {
  if (process.env.NODE_ENV === 'production') {
    return `${productoinHostAndPath}${fileName}`
  }
  return path.resolve(__dirname, `../../static/${fileName}`)
}

export default pathProcessor
