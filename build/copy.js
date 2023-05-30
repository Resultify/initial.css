import cpy from 'cpy'
import { globals } from './globals.js'

/**
 * @summary Copy files from src/files to dist/files
 * @async
 * @returns undefined
 */
async function copyFiles () {
  try {
    await cpy(`${globals.SRC}/files/**`, `${globals.TMP}/files`)
  } catch (error) {
    console.error(error)
  }
}

/**
 * @summary Copy html files from src to dist
 * @async
 * @returns undefined
 */
async function copyHtml () {
  try {
    await cpy(`${globals.SRC}/*.html`, globals.TMP)
  } catch (error) {
    console.error(error)
  }
}

/**
 * @summary Copy all files from .tmp to dist
 * @async
 * @returns undefined
 */
async function copyAll () {
  try {
    await cpy(`${globals.TMP}/**`, globals.DIST)
  } catch (error) {
    console.error(error)
  }
}

export { copyFiles, copyHtml, copyAll }
