import chokidar from 'chokidar'
import chalk from 'chalk'
import { cleanDocsCss } from './clean.js'
import { checkNode } from './check.js'
import { compileDemoCss } from './css.js'
import { globals } from './globals.js'
checkNode()

/**
 * @summary Watch task
 * @async
 * @returns undefined
 */
async function watchSrc () {
  try {
    await cleanDocsCss()
    await compileDemoCss()
    chokidar.watch([`${globals.SRC}/**/*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(`${chalk.red(event)} ${path}`)
      compileDemoCss()
    })
  } catch (error) {
    console.error(error)
  }
}

export { watchSrc }
