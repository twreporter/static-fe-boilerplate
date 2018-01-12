/* eslint no-console:0 */
const { getFiles, copyFilesTo, deleteFiles, setMetadata, makePublic } = require('./gcs-helpers')
const { logMesAndPassDownArg } = require('./log')
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
    console.log(`Checking ${query}...`)
    const targetVersionFileObjects = await getFiles(query)
    if (!targetVersionFileObjects.length) {
      throw new Error(`There's no file match with query: \`${query}\``)
    }

    // 2. delete current version
    console.log(`Start clearing files in ${publicDirName}`)
    await getFiles(`${publicDirName}/${targetSubfolderName}/`)
      .then(publicFileObjects => deleteFiles(publicFileObjects))
      .then(logMesAndPassDownArg(`> All files in ${publicDirName} are cleared.`))
      .catch((e) => {
        console.error('> Clearing failed.')
        throw e
      })

    // 3. copy target version to public folders
    console.log(`Start copy files that have been upload to ${publicDirName}...`)
    const copiedFileObjects = await copyFilesTo(targetVersionFileObjects, publicDirName)
      .then(logMesAndPassDownArg(`> All files are copied to ${publicDirName}.`))
      .catch((e) => {
        console.error('> Copying failed.')
        throw e
      })

    // 4-1. set metadata (cache-control) in metadata of public directory
    // 4-2. publish public directory
    console.log(`Start setting the metadata of files in ${publicDirName}/${targetSubfolderName}.`, metadata)
    await setMetadata(copiedFileObjects, metadata)
      .then(logMesAndPassDownArg('> The metadata of all files have been set.'))
      .then(logMesAndPassDownArg(`Start publishing all files in ${publicDirName}/${targetSubfolderName}`))
      .then(fileObjects => makePublic(fileObjects))
      .then(logMesAndPassDownArg('> All files are published.'))
      .catch((e) => {
        console.error('> Updating public files failed.')
        throw e
      })
    console.log(`==== Setting \`${targetSubfolderName}\` back to version ${version} is completed. ====`)
  } catch (err) {
    console.error('Error on rollingback: ', err)
    throw new Error()
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
