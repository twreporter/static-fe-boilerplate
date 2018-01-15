/* These constants should update with ~/package.json and ~/config.json */

const DEPLOY_TYPE = {
  STAGING: 'staging',
  PRODUCTION: 'production',
  ARCHIVE: 'archive',
  BACKUP: 'backup',
}

const SUBFOLDER_TYPE = {
  STATIC: 'static',
  DIST: 'dist',
}

module.exports = {
  DEPLOY_TYPE,
  SUBFOLDER_TYPE,
}
