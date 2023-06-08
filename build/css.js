import fsPromises from 'fs/promises'
import postcss from 'postcss'
import cssimport from 'postcss-import'
import cssnano from 'cssnano'
import { globby } from 'globby'
import { globals } from './globals.js'

/**
 * @summary Compile Css
 * @async
 * @returns undefined
 */
async function compileDemoCss () {
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
        console.log(`docs/${file.name}`)
        console.log(`docs/${file.name}.map`)
        await fsPromises.writeFile(`${globals.DOCS}/${file.name}`, postcssResult.css)
        if (postcssResult.map) {
          await fsPromises.writeFile(`${globals.DOCS}/${file.name}.map`, postcssResult.map.toString())
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * @summary Compile initial.css distribution
 * @async
 * @returns undefined
 */
async function compileCss () {
  try {
    const fileName = 'initial'
    const filePath = `${globals.SRC}/initial.css`
    const css = await fsPromises.readFile(filePath)
    const postcssResult = await postcss().use(cssimport()).process(css, {
      from: filePath,
      map: {
        inline: false,
        annotation: `${fileName}.css.map`
      }
    })
    console.log(`dist/${fileName}.css`)
    console.log(`dist/${fileName}.css.map`)
    await fsPromises.writeFile(`${globals.DIST}/${fileName}.css`, postcssResult.css)
    if (postcssResult.map) {
      await fsPromises.writeFile(`${globals.DIST}/${fileName}.css.map`, postcssResult.map.toString())
    }
  } catch (error) {
    console.error(error)
  }
}

/**
 * @summary Compile minified initial.css distribution
 * @async
 * @returns undefined
 */
async function compileMinCss () {
  try {
    const fileName = 'initial'
    const filePath = `${globals.SRC}/initial.css`
    const css = await fsPromises.readFile(filePath)
    const postcssResult = await postcss().use(cssimport()).use(cssnano()).process(css, {
      from: filePath
    })
    console.log(`dist/${fileName}.min.css`)
    await fsPromises.writeFile(`${globals.DIST}/${fileName}.min.css`, postcssResult.css)
  } catch (error) {
    console.error(error)
  }
}

export { compileCss, compileMinCss, compileDemoCss }
