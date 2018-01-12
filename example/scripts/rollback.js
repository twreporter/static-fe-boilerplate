/* eslint no-console:0 */
const { getFiles, copyFilesTo, deleteFiles, setMetadata, makePublic } = require('./gcs-helpers')
const CONFIGS = require('../config.json')
const selectors = require('./config-selectors')

const { PROJECT_NAME } = CONFIGS

const { selectCacheControl, selectFolderPostFix, selectSubFolder } = selectors

const TARGET = process.env.TARGET || ''

const version = process.argv[2]

if (!version) {
  throw new Error(`No version is specified. Check if the command you input fits the format \`npm run rollback:${TARGET} [version]\`.`)
}

async function rollback({ projectName, targetSubfolderName, publicFolderPostfix, backupFolderPostfix, metadata, targetVersion }) {
  const publicDirName = `${projectName}-${publicFolderPostfix}`
  const backupDirName = `${projectName}-${backupFolderPostfix}`
  try {
    // 1. check if target version exist
    const query = `${backupDirName}/${targetVersion}/${targetSubfolderName}`
    const targetVersionFileObjects = await getFiles(query)

    if (!targetVersionFileObjects.length) {
      throw new Error(`There's no file match with query: \`${query}\``)
    }

    // 2. delete current version
    await getFiles(`${publicDirName}/${targetSubfolderName}/`)
      .then(publicFileObjects => deleteFiles(publicFileObjects))

    // 3. copy target version to public folders
    const copiedFileObjects = await copyFilesTo(targetVersionFileObjects, publicDirName)

    // 4-1. set metadata (cache-control) in metadata of public directory
    // 4-2. publish public directory
    await setMetadata(copiedFileObjects, metadata)
      .then(fileObjects => makePublic(fileObjects))

    console.log(`==== Setting \`${targetSubfolderName}\` back to version ${version} is completed. ====`)
  } catch (err) {
    console.error('Error on rollingback: ', err)
  }
}

rollback({
  projectName: PROJECT_NAME,
  publicFolderPostfix: selectFolderPostFix('production'),
  backupFolderPostfix: selectFolderPostFix('backup'),
  targetSubfolderName: selectSubFolder(TARGET),
  targetVersion: version,
  metadata: {
    cacheControl: selectCacheControl(TARGET, 'production'),
  },
})
