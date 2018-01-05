/* eslint no-console:0 */
const Storage = require('@google-cloud/storage')
const CONFIGS = require('../config.json')

const { parseGCSPath } = require('./handle-path')

const { GOOGLE_CLOUD_STORAGE_CONFIGS } = CONFIGS
const { PROJECT_ID, BUCKET_NAME } = GOOGLE_CLOUD_STORAGE_CONFIGS

const storage = new Storage({
  projectId: PROJECT_ID,
})

const bucket = storage.bucket(BUCKET_NAME)

function uploadFiles(files = [], options = {}) {
  const promises = files.map(({ from, to }) => {
    const optionsWithDest = Object.assign({}, options, { destination: to })
    return new Promise((resolve, reject) => {
      bucket
        .upload(from, optionsWithDest)
        .then((results) => {
          const fileObject = results[0]
          resolve(fileObject)
        })
        .catch((e) => {
          console.error('Error on uploading:')
          reject(e)
        })
    })
  })
  return Promise.all(promises)
}

async function getFileNames(options) {
  const results = await bucket.getFiles(options)
  const files = results[0]
  return files.map(file => (!file.metadata ? '' : file.metadata.name))
}

function getFiles(prefix) {
  return new Promise((resolve, reject) => {
    bucket.getFiles({
      prefix,
    })
      .then((results) => {
        const fileObjs = results[0]
        resolve(fileObjs)
      })
      .catch((e) => {
        console.error('Error on getFiles:')
        reject(e)
      })
  })
}

function deleteFiles(fileObjects) {
  if (!fileObjects || !fileObjects.length) {
    console.log('There\'s no file to be deleted.')
    return Promise.resolve()
  }
  const promises = fileObjects.map((fileObject) => {
    return new Promise((resolve, reject) => {
      fileObject
        .delete()
        .then(() => {
          resolve()
        })
        .catch((e) => {
          console.error('Error on deleteFiles:')
          reject(e)
        })
    })
  })
  return Promise.all(promises)
}

function setMetadata(fileObjects, metadata) {
  const promises = fileObjects.map(fileObj => new Promise((resolve, reject) => {
    fileObj
      .setMetadata(metadata)
      .then(() => {
        resolve(fileObj)
      })
      .catch((e) => {
        console.error('Error on setMetadata:')
        reject(e)
      })
  }))
  return Promise.all(promises)
}

function makePublic(fileObjects) {
  const promises = fileObjects.map(fileObj => new Promise((resolve, reject) => {
    fileObj
      .makePublic()
      .then(() => {
        resolve(fileObj)
      })
      .catch((e) => {
        console.error('Error on makePublic:')
        reject(e)
      })
  }))
  return Promise.all(promises)
}


function copyFilesTo(fileObjects, destFolder) {
  const promises = fileObjects.map((fileObj) => {
    const pathObj = parseGCSPath(fileObj.name)
    const destination = `${destFolder}/${[].concat(pathObj.path).concat(pathObj.base).join('/')}`
    return new Promise((resolve, reject) => {
      fileObj
        .copy(destination)
        .then((results) => {
          resolve(results[0])
        })
        .catch((e) => {
          reject(e)
        })
    })
  })
  return Promise.all(promises)
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
