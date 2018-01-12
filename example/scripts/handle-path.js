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

/*
  Example.
    Regular Path:
      pathString = 'example-project-staging/static/mobile/logo.png'
      -> pathObj = {
        root: 'example-project-staging',
        version: '',
        path: 'static/mobile',
        base: 'logo.png',
      }
    Backup Path:
      pathString = 'example-project-backup/20180112-1625/static/mobile/logo.png'
      -> pathObj = {
        root: 'example-project-backup',
        version: '20180112-1625',
        path: 'static/mobile',
        base: 'logo.png',
      }
*/
function parseGCSPath(pathString = '') {
  const regexForBackupPath = new RegExp(`(^.+-${BACKUP.POSTFIX})\\/(.+?)\\/(.+)\\/(.+$)`, 'g')
  const regexForRegularPath = /(^.+?)\/(.+)\/(.+$)/g
  const pathObj = {}
  if (regexForBackupPath.exec(pathString)) {
    pathObj.root = RegExp.$1
    pathObj.version = RegExp.$2
    pathObj.path = RegExp.$3
    pathObj.base = RegExp.$4
  } else if (regexForRegularPath.exec(pathString)) {
    pathObj.root = RegExp.$1
    pathObj.version = ''
    pathObj.path = RegExp.$2
    pathObj.base = RegExp.$3
  }
  return pathObj
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
