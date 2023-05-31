import { deleteAsync } from 'del'
import { globals } from './globals.js'

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
 * @summary Clean all css files in the demo folder
 * @async
 * @returns undefined
 */
async function cleanDemoCss () {
  try {
    if (globals.ROOT_DIR_NAME === 'initial-css') {
      await deleteAsync([`${globals.DEMO}/**/*.css`])
    }
  } catch (error) {
    console.error(error)
  }
}

export { cleanDemoCss, cleanDist }
