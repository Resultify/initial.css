import fsPromises from 'fs/promises'
import postcss from 'postcss'
import cssimport from 'postcss-import'
import { globby } from 'globby'
import { globals } from './globals.js'

/**
 * @summary Compile Css
 * @param {boolean} map - Generate css sourcemap
 * @async
 * @returns undefined
 */
async function compileCss (map = false) {
  try {
    const files = await globby(`${globals.SRC}/*.css`, { objectMode: true })
    if (files !== undefined) {
      for await (const file of files) {
        const css = await fsPromises.readFile(file.path)
        const postcssResult = await postcss().use(cssimport()).process(css, {
          map: map ? { inline: true } : false,
          from: file.path
        })
        console.log(`Compile dist/${file.name}`)
        await fsPromises.writeFile(`${globals.TMP}/${file.name}`, postcssResult.css)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export { compileCss }
