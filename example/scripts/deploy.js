/* eslint no-console:0 */
const { copyFilesTo, setMetadata, uploadFiles, makePublic, getFiles, deleteFiles } = require('./gcs-helpers')
const { joinStrings } = require('./handle-path')
const glob = require('glob')
const path = require('path')

const CWD = process.cwd()

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
    throw new Error(`Preparing files failed: \`pathOfFolderToUpload\` should be specified, but is ${pathOfFolderToUpload}.`)
  }
  const staticFiles = glob.sync(`${pathOfFolderToUpload}/**`, { cwd: CWD, nodir: true })
  const version = buildVersionString()
  const filesToUpload = staticFiles.map(file => ({
    from: path.resolve(CWD, file),
    to: joinStrings([backupDirName, version, targetSubfolderName, path.relative(pathOfFolderToUpload, file)], '/'),
  }))
  return filesToUpload
}

async function deploy({ localFilesPath, publicDirName, targetSubfolderName, backupDirName, metadata, uploadConfigs }) {
  try {
    // 1. clear staging folder
    await getFiles(`${publicDirName}/${targetSubfolderName}/`)
      .then(deleteFiles)

    // 2. upload files to versions
    const filesToUpload = prepareFiles(localFilesPath, backupDirName, targetSubfolderName)
    const uploadedFileObjects = await uploadFiles(filesToUpload, uploadConfigs)

    // 3. copy versions to public directory
    const copiedFileObjects = await copyFilesTo(uploadedFileObjects, publicDirName)

    // 4-1. set metadata (cache-control) in metadata of public directory
    // 4-2. publish public directory
    await setMetadata(copiedFileObjects, metadata)
      .then(fileObjects => makePublic(fileObjects))

    console.log('==== Deploying is completed ====')
  } catch (err) {
    console.error('Error on deployment: ', err)
  }
}

module.exports = deploy
