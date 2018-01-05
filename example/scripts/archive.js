/* eslint no-console:0 */
const { setMetadata, getFiles } = require('./gcs-helpers')
const CONFIGS = require('../config.json')
const selectors = require('./config-selectors')

const ARCHIVE_TARGET = process.env.ARCHIVE_TARGET || ''

const { GOOGLE_CLOUD_STORAGE_CONFIGS, PROJECT_NAME } = CONFIGS

const log = message => (passedBy) => {
  console.log(message)
  return passedBy
}

async function archive({ projectName, productionFolderPostfix, targetSubfolderName, metadata }) {
  const publicDirName = `${projectName}-${productionFolderPostfix}`
  const publicFileObjects = await getFiles(`${publicDirName}/${targetSubfolderName}/`)
  if (publicFileObjects) {
    console.log(`Start setting the metadata of files in ${publicDirName}`, metadata)
    await setMetadata(publicFileObjects, metadata)
      .then(log('> The metadata of all files have been set.'))
      .catch((e) => {
        console.error('Updating public files failed.')
        throw e
      })
  }
}

archive({
  projectName: PROJECT_NAME,
  productionFolderPostfix: GOOGLE_CLOUD_STORAGE_CONFIGS.PRODUCTION.POSTFIX,
  targetSubfolderName: selectors.selectSubFolder(ARCHIVE_TARGET),
  metadata: {
    cacheControl: selectors.selectCacheControl(ARCHIVE_TARGET, 'archive'),
  },
})
  .then(() => {
    console.log('Updating completed.')
  })
  .catch((e) => {
    console.error(e)
  })
