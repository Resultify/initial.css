import chokidar from 'chokidar'
import chalk from 'chalk'
import { checkNode } from './check.js'
import { copyFiles, copyHtml } from './copy.js'
import { compileCss } from './css.js'
import { globals } from './globals.js'
import { build } from './build.js'
import { cleanTmp } from './clean.js'
build()
checkNode()

/**
 * @summary Watch task
 * @async
 * @returns undefined
 */
async function watchSrc () {
  try {
    await cleanTmp()
    await copyFiles()
    await copyHtml()
    await compileCss(true)
    chokidar.watch([`${globals.SRC}/**/*.css`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(`${chalk.red(event)} ${path}`)
      compileCss(true)
    })

    chokidar.watch([`${globals.SRC}/**/*.html`], { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(`${chalk.red(event)} ${path}`)
      copyHtml()
    })

    chokidar.watch(`${globals.SRC}/files/**/*.{png,jpg,mp4,svg,mp3}`, { ignoreInitial: true, awaitWriteFinish: false }).on('all', (event, path) => {
      console.log(`${chalk.red(event)} ${path}`)
      copyFiles()
    })
  } catch (error) {
    console.error(error)
  }
}

export { watchSrc }
