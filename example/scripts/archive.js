/* eslint no-console:0 */
const { setMetadata, getFiles } = require('./gcs-helpers')
const CONFIGS = require('../config.json')
const { selectCacheControl, selectRootFolder, selectSubFolder } = require('./config-selectors')

const ARCHIVE_TARGET = process.env.ARCHIVE_TARGET || ''

const { PROJECT_NAME } = CONFIGS

async function archive({ publicDirName, targetSubfolderName, metadata }) {
  const targetPath = `${publicDirName}/${targetSubfolderName}/`
  try {
    const publicFileObjects = await getFiles(targetPath)
    if (publicFileObjects && publicFileObjects.length > 0) {
      await setMetadata(publicFileObjects, metadata)
    } else {
      throw new Error(`There's no file object in ${targetPath}.`)
    }
    console.log('==== Archiving is completed ====')
  } catch (err) {
    console.error('Error on archiving: ', err)
  }
}

archive({
  publicDirName: selectRootFolder(PROJECT_NAME, 'production'),
  targetSubfolderName: selectSubFolder(ARCHIVE_TARGET),
  metadata: {
    cacheControl: selectCacheControl(ARCHIVE_TARGET, 'archive'),
  },
})
