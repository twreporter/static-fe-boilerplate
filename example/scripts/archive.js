/* eslint no-console:0 */
const { setMetadata, getFiles } = require('./gcs-helpers')
const CONFIGS = require('../config.json')
const { selectCacheControl, selectRootFolder, selectSubFolder } = require('./config-selectors')

const { SUBFOLDER_TYPE } = process.env

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
  targetSubfolderName: selectSubFolder(SUBFOLDER_TYPE),
  metadata: {
    cacheControl: selectCacheControl(SUBFOLDER_TYPE, 'archive'),
  },
})
