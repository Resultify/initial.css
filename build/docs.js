import { cleanDocsCss } from './clean.js'
import { checkNode } from './check.js'
import { compileDemoCss } from './css.js'
checkNode()

/**
 * @summary Watch task
 * @async
 * @returns undefined
 */
async function docs () {
  try {
    await cleanDocsCss()
    await compileDemoCss()
  } catch (error) {
    console.error(error)
  }
}

export { docs }
