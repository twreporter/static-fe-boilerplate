/* eslint no-console:0 */
const deploy = require('./deploy')
const CONFIGS = require('../config.json')
const selectors = require('./config-selectors')

const { DEPLOY_TYPE } = process.env
const subfolderType = 'static'

const { selectCacheControl, selectRootFolder, selectSubFolder } = selectors

const { PROJECT_NAME, LOCAL_CONFIGS } = CONFIGS
const { STATIC_PATH } = LOCAL_CONFIGS

deploy({
  localFilesPath: STATIC_PATH,
  publicDirName: selectRootFolder(PROJECT_NAME, DEPLOY_TYPE),
  backupDirName: selectRootFolder(PROJECT_NAME, 'backup'),
  targetSubfolderName: selectSubFolder(subfolderType),
  metadata: {
    cacheControl: selectCacheControl(subfolderType, DEPLOY_TYPE),
    predefinedAcl: 'publicRead',
  },
  uploadConfigs: {},
})
