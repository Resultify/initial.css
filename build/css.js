import fsPromises from 'fs/promises'
import postcss from 'postcss'
import cssimport from 'postcss-import'
import cssnano from 'cssnano'
import { globby } from 'globby'
import { globals } from './globals.js'

/**
 * @summary Compile Css
 * @param {boolean} dist - Compile for dist folder or demo folder
 * @async
 * @returns undefined
 */
async function compileCss (dist = false) {
  const path = dist ? globals.DIST : globals.DEMO
  const folderName = dist ? 'dist' : 'demo'
  try {
    const files = await globby(`${globals.SRC}/*.css`, { objectMode: true })
    if (files !== undefined) {
      for await (const file of files) {
        const css = await fsPromises.readFile(file.path)
        const postcssResult = await postcss().use(cssimport()).process(css, {
          from: file.path,
          map: {
            inline: false,
            annotation: `${file.name}.map`
          }
        })
        console.log(`${folderName}/${file.name}`)
        console.log(`${folderName}/${file.name}.map`)
        await fsPromises.writeFile(`${path}/${file.name}`, postcssResult.css)
        if (postcssResult.map) {
          await fsPromises.writeFile(`${path}/${file.name}.map`, postcssResult.map.toString())
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * @summary Compile minified CSS
 * @async
 * @returns undefined
 */
async function compileMinCss () {
  try {
    const files = await globby(`${globals.SRC}/*.css`, { objectMode: true })
    if (files !== undefined) {
      for await (const file of files) {
        const css = await fsPromises.readFile(file.path)
        const postcssResult = await postcss().use(cssimport()).use(cssnano()).process(css, {
          from: file.path
        })
        console.log(`dist/${file.name.slice(0, -4)}.min.css`)
        await fsPromises.writeFile(`${globals.DIST}/${file.name.slice(0, -4)}.min.css`, postcssResult.css)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export { compileCss, compileMinCss }
