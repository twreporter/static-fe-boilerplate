/* eslint no-console:0 */
const { copyFilesTo, setMetadata, uploadFiles, makePublic, getFiles, deleteFiles } = require('./gcs-helpers')

const path = require('path')
const glob = require('glob')
const { joinStrings } = require('./handle-path')

const CWD = process.cwd()

const log = message => (passedBy) => {
  console.log(message)
  return passedBy
}

function buildVersionString() {
  const dateToYYYYMMDDhhmm = (date) => {
    const MM = `${date.getMonth() + 1}`.padStart(2, '0')
    const DD = `${date.getDate()}`.padStart(2, '0')
    const hh = `${date.getHours()}`.padStart(2, '0')
    const mm = `${date.getMinutes()}`.padStart(2, '0')
    return `${date.getFullYear()}${MM}${DD}-${hh}${mm}`
  }
  return dateToYYYYMMDDhhmm(new Date())
}

function prepareFiles(pathOfFolderToUpload, backupDirName, targetSubfolderName) {
  if (!pathOfFolderToUpload) {
    const errorMessage = 'prepareFiles failed: pathOfFolder shold be specified'
    throw new Error(errorMessage)
  }
  const staticFiles = glob.sync(`${pathOfFolderToUpload}/**`, { cwd: CWD, nodir: true })
  const version = buildVersionString()
  const filesToUpload = staticFiles.map(file => ({
    from: path.resolve(CWD, file),
    to: joinStrings([backupDirName, version, targetSubfolderName, path.relative(pathOfFolderToUpload, file)], '/'),
  }))
  return filesToUpload
}

async function deploy({ projectName, localFilesPath, targetSubfolderName, publicFolderPostfix, backupFolderPostfix, metadata, uploadConfigs }) {
  const publicDirName = `${projectName}-${publicFolderPostfix}`
  const backupDirName = `${projectName}-${backupFolderPostfix}`
  // 1. clear staging folder
  console.log(`Start clearing files in ${publicDirName}`)
  await getFiles(`${publicDirName}/${targetSubfolderName}/`)
    .then(publicFileObjects => deleteFiles(publicFileObjects))
    .then(() => {
      console.log(`> All files in ${publicDirName} are cleared.`)
    })
    .catch((e) => {
      console.error('> Clearing failed.')
      throw e
    })
  // 2. upload files to versions
  console.log(`Start uploading files from ${localFilesPath} to ${backupDirName}...`)
  const filesToUpload = prepareFiles(localFilesPath, backupDirName, targetSubfolderName)
  const uploadedFileObjects = await uploadFiles(filesToUpload, uploadConfigs)
    .then(log(`> All files are upload to ${backupDirName}.`))
    .catch((e) => {
      console.error('> Uploading failed.')
      throw e
    })

  // 3. copy versions to public directory
  console.log(`Start copy files that have been upload to ${publicDirName}...`)
  const copiedFileObjects = await copyFilesTo(uploadedFileObjects, publicDirName)
    .then(log(`> All files are copied to ${publicDirName}.`))
    .catch((e) => {
      console.error('> Copying failed.')
      throw e
    })

  // 4-1. set metadata (cache-control) in metadata of public directory
  // 4-2. publish public directory
  console.log(`Start setting the metadata of files in ${publicDirName}/${targetSubfolderName}.`, metadata)
  await setMetadata(copiedFileObjects, metadata)
    .then(log('> The metadata of all files have been set.'))
    .then(log(`Start publishing all files in ${publicDirName}/${targetSubfolderName}`))
    .then(fileObjects => makePublic(fileObjects))
    .then(log('> All files are published.'))
    .catch((e) => {
      console.error('> Updating public files failed.')
      throw e
    })
}

module.exports = deploy
