import { deleteAsync } from 'del'
import { globals } from './globals.js'
import fsPromises from 'fs/promises'

/**
 * @summary Clean the dist folder
 * @async
 * @returns undefined
 */
async function cleanDist () {
  try {
    if (globals.ROOT_DIR_NAME === 'initial-css') {
      await deleteAsync([`${globals.DIST}/**/*`])
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * @summary Clean the tmp folder
 * @async
 * @returns undefined
 */
async function cleanTmp () {
  try {
    await fsPromises.mkdir(globals.TMP, { recursive: true })
    if (globals.ROOT_DIR_NAME === 'initial-css') {
      await deleteAsync([`${globals.TMP}/**/*`])
    }
  } catch (error) {
    console.error(error)
  }
}

export { cleanDist, cleanTmp }
