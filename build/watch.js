import chokidar from 'chokidar'
import chalk from 'chalk'
import { checkNode } from './check.js'
import { compileCss } from './css.js'
import { globals } from './globals.js'
checkNode()

/**
 * @summary Watch task
 * @async
 * @returns undefined
 */
async function watchSrc () {
  try {
    await compileCss()
    chokidar.watch([`${globals.SRC}/**/*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(`${chalk.red(event)} ${path}`)
      compileCss()
    })
  } catch (error) {
    console.error(error)
  }
}

export { watchSrc }
