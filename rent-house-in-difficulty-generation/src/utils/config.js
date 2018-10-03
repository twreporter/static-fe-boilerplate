import { storage } from '@twreporter/react-components/lib/shared/configs'

const IMAGES_FOLDER = 'images'

export const storageUrlPrefix = `${storage.google.schema}://${storage.google.hostname}/${storage.google.bucket}/${IMAGES_FOLDER}/`
