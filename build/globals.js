/**
 * @summary Global constants
 * @typedef GLOBALS
 * @type {Object}
 * @property {string} ROOT_PATH
 * @property {string|undefined} ROOT_DIR_NAME
 * @property {string} SRC
 * @property {string} DIST
 * @property {string} DEMO
 */

/**
 * @summary Global constants
 * @type {GLOBALS}
 */
const globals = {}

globals.ROOT_PATH = process.cwd()
globals.ROOT_DIR_NAME = globals.ROOT_PATH.split('/').pop()

globals.SRC = `${globals.ROOT_PATH}/src`
globals.DEMO = `${globals.ROOT_PATH}/demo`
globals.DIST = `${globals.ROOT_PATH}/dist`

export { globals }
