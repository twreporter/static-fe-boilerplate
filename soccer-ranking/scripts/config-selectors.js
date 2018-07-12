/* eslint no-console:0 */
const CONFIGS = require('../config.json')

const { GOOGLE_CLOUD_STORAGE_CONFIGS } = CONFIGS
const { DIST_DIR_NAME, STATIC_DIR_NAME } = GOOGLE_CLOUD_STORAGE_CONFIGS

const selectConfigByType = (deployType) => {
  switch (deployType) {
    case 'staging':
      return GOOGLE_CLOUD_STORAGE_CONFIGS.STAGING
    case 'production':
      return GOOGLE_CLOUD_STORAGE_CONFIGS.PRODUCTION
    case 'archive':
      return GOOGLE_CLOUD_STORAGE_CONFIGS.ARCHIVE
    case 'backup':
      return GOOGLE_CLOUD_STORAGE_CONFIGS.BACKUP
    default:
      return {}
  }
}

const selectFolderPostfix = (deployType) => {
  return selectConfigByType(deployType).POSTFIX
}

const selectFolderPrefix = (deployType) => {
  return selectConfigByType(deployType).PREFIX
}

const selectRootFolder = (projectName, deployType) => {
  const prefix = selectFolderPrefix(deployType)
  const postfix = selectFolderPostfix(deployType)
  return [].concat(prefix, projectName, postfix).filter(value => value).join('-')
}

const selectCacheControl = (subfolderType, deployType) => {
  const defaultCacheControl = 'public, max-age=300'
  const CONFIG = selectConfigByType(deployType)
  const { CACHE_CONTROL } = CONFIG
  if (!CACHE_CONTROL) {
    console.warn(`There's no \`CACHE_CONTROL\` with ${deployType} in configs.`)
    return defaultCacheControl
  }
  switch (subfolderType) {
    case 'static':
      return CACHE_CONTROL.STATIC
    case 'dist':
      return CACHE_CONTROL.DIST
    default:
      return defaultCacheControl
  }
}

const selectSubFolder = (subfolderType) => {
  switch (subfolderType) {
    case 'static':
      return STATIC_DIR_NAME
    case 'dist':
      return DIST_DIR_NAME
    default:
      return ''
  }
}

module.exports = {
  selectCacheControl,
  selectRootFolder,
  selectSubFolder,
}
