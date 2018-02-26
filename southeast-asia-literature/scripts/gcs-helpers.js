/* eslint no-console:0 */
const { logMesAndPassDownArg } = require('./log')
const { gzipStaticFileTypes } = require('./gzip-static-flie-type')
const CONFIGS = require('../config.json')
const get = require('lodash.get')
const Storage = require('@google-cloud/storage')

const _ = {
  get,
}

const { parseGCSPath } = require('./handle-path')

const { GOOGLE_CLOUD_STORAGE_CONFIGS } = CONFIGS
const { PROJECT_ID, BUCKET_NAME } = GOOGLE_CLOUD_STORAGE_CONFIGS

const storage = new Storage({
  projectId: PROJECT_ID,
})

const bucket = storage.bucket(BUCKET_NAME)

function uploadFiles(files = [], options = {}) {
  console.log('Start uploading files...')
  const promises = files.map(({ from, to }) => {
    const shouldGzipOnFly = gzipStaticFileTypes.some((filetype) => {
      return from.endsWith(filetype)
    })
    const optionsWithDest = Object.assign({}, options, { destination: to, gzip: shouldGzipOnFly })
    return new Promise((resolve, reject) => {
      bucket
        .upload(from, optionsWithDest)
        .then((results) => {
          const fileObj = results[0]
          resolve(fileObj)
        })
        .catch((err) => {
          console.error(`Error on uploading \`${from}\` to \`${to}\`:`, err)
          reject(err)
        })
    })
  })
  return Promise.all(promises)
    .then(logMesAndPassDownArg('All files have been uploaded successfully.'))
    .catch(() => {
      console.error('Uploading failed.')
      throw new Error()
    })
}

function getFileNames(options) {
  console.log('Start getting file names...')
  return bucket.getFiles(options)
    .then((results) => {
      const fileObjs = results[0]
      const fileNames = fileObjs.map(fileObj => (!fileObj.metadata ? '' : fileObj.metadata.name))
      console.log('Getting file names successfully.')
      return fileNames
    })
    .catch((err) => {
      console.error(`Error on getting files with option ${options}.`, err)
      throw new Error()
    })
}

function getFiles(prefix) {
  console.log(`Start getting files with prefix ${prefix}...`)
  return bucket.getFiles({
    prefix,
  })
    .then((results) => {
      const fileObjs = results[0]
      console.log('Getting file objects successfully.')
      return fileObjs
    })
    .catch((err) => {
      console.error(`Error on getting files with prefix \`${prefix}\`:`, err)
      throw new Error()
    })
}

function deleteFiles(fileObjs) {
  console.log('Start deleting files...')
  if (!_.get(fileObjs, 'length')) {
    console.log('There\'s no file to be deleted.')
    return Promise.resolve()
  }
  const promises = fileObjs.map((fileObj) => {
    return new Promise((resolve, reject) => {
      fileObj
        .delete()
        .then(() => {
          resolve()
        })
        .catch((err) => {
          const fileName = _.get(fileObj, 'metadata.name', '')
          console.error(`Error on deleting file \`${fileName}\`:`, err)
          reject(err)
        })
    })
  })
  return Promise.all(promises)
    .then(logMesAndPassDownArg('All files have been deleted successfully.'))
    .catch(() => {
      console.error('Deleting failed.')
      throw new Error()
    })
}

function setMetadata(fileObjs, metadata) {
  console.log('Start setting metadata...')
  const promises = fileObjs.map(fileObj => new Promise((resolve, reject) => {
    fileObj
      .setMetadata(metadata)
      .then(() => {
        resolve(fileObj)
      })
      .catch((err) => {
        const fileName = _.get(fileObj, 'metadata.name', '')
        console.error(`Error on setting metadata of file \`${fileName}\`:`, err)
        reject(err)
      })
  }))
  return Promise.all(promises)
    .then(logMesAndPassDownArg('All metadata have been set successfully.'))
    .catch(() => {
      console.error('Setting metadata failed.')
      throw new Error()
    })
}

function makePublic(fileObjs) {
  console.log('Start publishing files...')
  const promises = fileObjs.map(fileObj => new Promise((resolve, reject) => {
    fileObj
      .makePublic()
      .then(() => {
        resolve(fileObj)
      })
      .catch((err) => {
        const fileName = _.get(fileObj, 'metadata.name', '')
        console.error(`Error on publishing \`${fileName}\`:`, err)
        reject(err)
      })
  }))
  return Promise.all(promises)
    .then(logMesAndPassDownArg('All files have been published successfully.'))
    .catch(() => {
      console.error('Publishing files failed.')
      throw new Error()
    })
}


function copyFilesTo(fileObjs, destFolder) {
  console.log('Start copying files...')
  const promises = fileObjs.map((fileObj) => {
    const pathObj = parseGCSPath(fileObj.name)
    const destination = `${destFolder}/${[].concat(pathObj.path, pathObj.base).join('/')}`
    return new Promise((resolve, reject) => {
      fileObj
        .copy(destination)
        .then((results) => {
          const fileObjInDest = results[0]
          resolve(fileObjInDest)
        })
        .catch((e) => {
          const fileName = _.get(fileObj, 'metadata.name', '')
          console.error(`Error on copying file \`${fileName}\` to ${destination}`)
          reject(e)
        })
    })
  })
  return Promise.all(promises)
    .then(logMesAndPassDownArg('All files have been copied successfully.'))
    .catch(() => {
      console.error('Copying files failed.')
      throw new Error()
    })
}

module.exports = {
  copyFilesTo,
  deleteFiles,
  getFiles,
  getFileNames,
  makePublic,
  setMetadata,
  uploadFiles,
}
