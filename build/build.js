import { checkNode } from './check.js'
import { cleanDist, cleanTmp } from './clean.js'
import { copyFiles, copyHtml, copyAll } from './copy.js'
import { compileCss } from './css.js'
checkNode()

/**
 * @summary Build the template
 * @async
 * @returns undefined
 */
async function build () {
  await cleanTmp()
  await copyFiles()
  await copyHtml()
  await compileCss()
  await cleanDist()
  await copyAll()
}

export { build }
