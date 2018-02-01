/* eslint no-console:0 */
const {
  getFiles, copyFilesTo, deleteFiles, setMetadata, makePublic,
} = require('./gcs-helpers')
const { selectCacheControl, selectRootFolder, selectSubFolder } = require('./config-selectors')
const CONFIGS = require('../config.json')
const CONSTANTS = require('./constants')

const { PROJECT_NAME } = CONFIGS

const { SUBFOLDER_TYPE } = process.env
const version = process.argv[2]

if (!version) {
  throw new Error(`No version is specified. Check if the command you input fits the format \`npm run rollback:${SUBFOLDER_TYPE} [version]\`.`)
}

async function rollback({
  backupDirName, publicDirName, targetSubfolderName, metadata, targetVersion,
}) {
  try {
    // 1. check if target version exist
    const query = `${backupDirName}/${targetVersion}/${targetSubfolderName}/`
    const targetVersionFileObjects = await getFiles(query)
    if (targetVersionFileObjects && targetVersionFileObjects.length > 0) {
      // 2. delete current version
      await getFiles(`${publicDirName}/${targetSubfolderName}/`)
        .then(publicFileObjects => deleteFiles(publicFileObjects))

      // 3. copy target version to public folders
      const copiedFileObjects = await copyFilesTo(targetVersionFileObjects, publicDirName)

      // 4-1. set metadata (cache-control) in metadata of public directory
      // 4-2. publish public directory
      await setMetadata(copiedFileObjects, metadata)
        .then(fileObjects => makePublic(fileObjects))
    } else {
      throw new Error(`There's no file match with query: \`${query}\``)
    }
    console.log(`==== Setting \`${targetSubfolderName}\` back to version ${version} is completed. ====`)
  } catch (err) {
    console.error('Error on rollback: ', err)
  }
}

rollback({
  publicDirName: selectRootFolder(PROJECT_NAME, CONSTANTS.DEPLOY_TYPE.PRODUCTION),
  backupDirName: selectRootFolder(PROJECT_NAME, CONSTANTS.DEPLOY_TYPE.BACKUP),
  targetSubfolderName: selectSubFolder(SUBFOLDER_TYPE),
  targetVersion: version,
  metadata: {
    cacheControl: selectCacheControl(SUBFOLDER_TYPE, CONSTANTS.DEPLOY_TYPE.PRODUCTION),
  },
})
