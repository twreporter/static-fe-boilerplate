/* eslint no-console:0 */
const CONFIGS = require('../config.json')
const nodePath = require('path')
const { selectFolderPostFix } = require('./config-selectors')

const { PROJECT_NAME, LOCAL_CONFIGS, GOOGLE_CLOUD_STORAGE_CONFIGS } = CONFIGS

const { DIST_DIR_NAME, STATIC_DIR_NAME, BUCKET_NAME, BACKUP } = GOOGLE_CLOUD_STORAGE_CONFIGS

const absRootPath = nodePath.resolve(__dirname, '../')

function getPublicUrl(subfolderType, deployType) {
  const protocol = 'https'
  const host = 'storage.googleapis.com'
  const publicDirName = `${PROJECT_NAME}-${selectFolderPostFix(deployType)}`
  switch (subfolderType) {
    case 'dist':
      return `${protocol}://${host}/${BUCKET_NAME}/${publicDirName}/${DIST_DIR_NAME}`
    case 'static':
      return `${protocol}://${host}/${BUCKET_NAME}/${publicDirName}/${STATIC_DIR_NAME}`
    case 'origin':
    default:
      return `${protocol}://${host}/${BUCKET_NAME}/${publicDirName}`
  }
}

function getLocalPath(subfolderType) {
  switch (subfolderType) {
    case 'dist':
      return nodePath.resolve(absRootPath, LOCAL_CONFIGS.DIST_PATH)
    case 'static':
      return nodePath.resolve(absRootPath, LOCAL_CONFIGS.STATIC_PATH)
    default:
      return absRootPath
  }
}

function joinStrings(array, separator = '') {
  if (!Array.isArray(array)) return array
  const checkIfIsValid = (element) => {
    if (element === 0) return true
    return !!element
  }
  return array.filter(checkIfIsValid).join(separator)
}

function parseGCSPath(pathString = '') {
  const splittedPath = pathString.split('/')
  const root = splittedPath[0]
  const finalIndex = splittedPath.length - 1
  const lastElement = splittedPath[finalIndex]
  const version = root.endsWith(BACKUP.POSTFIX) ? splittedPath[1] : null
  const base = lastElement.includes('.') ? lastElement : null
  const pathElements = []
  if (version) {
    pathElements.push(...splittedPath.slice(2, finalIndex))
  } else {
    pathElements.push(...splittedPath.slice(1, finalIndex))
  }
  if (!base) {
    pathElements.push(lastElement)
  }
  const path = joinStrings(pathElements, '/')
  return {
    root,
    version,
    path,
    base,
  }
}

// function buildGCSPath({ root, version, path, base }) {
//   const pathElements = [root, version, path, base]
//   return joinStrings(pathElements, '/')
// }

module.exports = {
  // buildGCSPath,
  parseGCSPath,
  joinStrings,
  getPublicUrl,
  getLocalPath,
}
