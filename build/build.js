import { checkNode } from './check.js'
import { cleanDist } from './clean.js'
import { compileCss, compileMinCss } from './css.js'
checkNode()

/**
 * @summary Build the template
 * @async
 * @returns undefined
 */
async function build () {
  await cleanDist()
  await compileCss()
  await compileMinCss()
}

export { build }
