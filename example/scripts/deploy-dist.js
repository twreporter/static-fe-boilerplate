/* eslint no-console:0 */
const deploy = require('./deploy')
const CONFIGS = require('../config.json')
const selectors = require('./config-selectors')

const { DEPLOY_TYPE } = process.env
const subfolderType = 'dist'

const { selectCacheControl, selectFolderPostFix, selectSubFolder } = selectors

const { PROJECT_NAME, LOCAL_CONFIGS } = CONFIGS
const { DIST_PATH } = LOCAL_CONFIGS

deploy({
  projectName: PROJECT_NAME,
  localFilesPath: DIST_PATH,
  targetSubfolderName: selectSubFolder(subfolderType),
  publicFolderPostfix: selectFolderPostFix(DEPLOY_TYPE),
  backupFolderPostfix: selectFolderPostFix('backup'),
  metadata: {
    cacheControl: selectCacheControl(subfolderType, DEPLOY_TYPE),
    predefinedAcl: 'publicRead',
  },
  uploadConfigs: {
    gzip: true,
  },
})
