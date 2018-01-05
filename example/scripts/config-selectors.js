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

const selectFolderPostFix = (deployType) => {
  return selectConfigByType(deployType).POSTFIX
}

const selectCacheControl = (subfolderType, deployType) => {
  const CONFIG = selectConfigByType(deployType)
  const { CACHE_CONTROL } = CONFIG
  const defaultCacheControl = 'public, max-age=300'
  if (!CACHE_CONTROL) return defaultCacheControl
  switch (subfolderType) {
    case 'static':
      return CACHE_CONTROL.DIST
    case 'dist':
      return CACHE_CONTROL.STATIC
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
  selectFolderPostFix,
  selectSubFolder,
}
