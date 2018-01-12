/* eslint no-console:0 */
const { setMetadata, getFiles } = require('./gcs-helpers')
const CONFIGS = require('../config.json')
const selectors = require('./config-selectors')

const ARCHIVE_TARGET = process.env.ARCHIVE_TARGET || ''

const { GOOGLE_CLOUD_STORAGE_CONFIGS, PROJECT_NAME } = CONFIGS

async function archive({ projectName, productionFolderPostfix, targetSubfolderName, metadata }) {
  const publicDirName = `${projectName}-${productionFolderPostfix}`
  const targetPath = `${publicDirName}/${targetSubfolderName}/`
  try {
    const publicFileObjects = await getFiles(targetPath)
    if (publicFileObjects) {
      await setMetadata(publicFileObjects, metadata)
    } else {
      console.log(`There's no file object in ${targetPath}.`)
    }
    console.log('==== Archiving is completed ====')
  } catch (err) {
    console.error('Error on deployment: ', err)
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
