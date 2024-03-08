/* global getComputedStyle */
/**
 * #### get root font size
 * @returns {number}
 */
function getRootFontSize () {
  const rootFontSizeValue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', ''))
  return rootFontSizeValue
}

/**
 * #### get --root__font-size css variable from root element
 * @returns {number}
 */
function getRootFontSizeCssVar () {
  let rootFontSizeCssVar = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--root__font-size'))
  if (!rootFontSizeCssVar) {
    rootFontSizeCssVar = 1
  }
  return rootFontSizeCssVar
}

/**
 * #### insert root font size value into .show-root-font-size-in-px element
 * @param {number} value - root font size value
 * @returns undefined
 */
function insertRootFontSizeInElement (value) {
  const element = document.querySelector('.show-root-font-size-in-px')
  if (element) {
    element.innerHTML = `${value} px`
  }
}

/**
 * #### insert root font size value into input[name="rootFontSize"]
 * @param {number} value - root font size value
 * @returns undefined
 */
function insertRootFontSizeInInput (value) {
  /**
   * @type {?HTMLInputElement}
   */
  const inputElement = document.querySelector('[name="rootFontSize"]')
  if (inputElement) {
    inputElement.value = String(value)
  }
}

/**
 * #### insert heading size ratio value into input[name="headingsSizeRatio"]
 * @param {number} value - heading size ratio value
 * @returns undefined
 */
function setHeadingSizeRatioValue (value) {
  /**
   * @type {?HTMLInputElement}
   */
  const inputElement = document.querySelector('[name="headingsSizeRatio"]')
  if (inputElement) {
    inputElement.value = String(value)
  }
}

/**
 * #### get --heading-scale-ratio css variable from root element
 * @returns {number}
 */
function getHeadingSizeRatio () {
  const headingRatio = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--heading-scale-ratio'))
  return headingRatio
}

/**
 * #### insert heading size ratio value into heading elements
 * @returns undefined
 */
function insertHeadingSizeInElements () {
  document.querySelectorAll('.show-heading-size-in-px').forEach(element => {
    if (element.parentNode) {
      /**
       * @type {any}
       */
      const parentNode = element.parentNode
      const value = Math.floor(parseFloat(getComputedStyle(parentNode).getPropertyValue('font-size').replace('px', '')))
      element.innerHTML = `${value} px`
    }
  })
}

/**
 * #### update root sizes
 * @param {any} event - event object
 * @returns undefined
 */
function updateRootFontSize (event) {
  document.documentElement.style.setProperty('--root__font-size', `${event.target?.value}rem`)
  const rootFontSize = getRootFontSize()
  insertRootFontSizeInElement(rootFontSize)
  insertHeadingSizeInElements()
}

/**
 * #### update heading sizes
 * @param {any} event - event object
 * @returns undefined
 */
function updateHeadingSizes (event) {
  document.documentElement.style.setProperty('--heading-scale-ratio', `${event.target.value}`)
  insertHeadingSizeInElements()
}

/**
 * #### add predefined root font size value
 * @param {any} event - event object
 * @returns undefined
 */
function predefinedRootFontSize (event) {
  const remValue = parseFloat(event.target.innerHTML.replace('px', '')) / 16
  insertRootFontSizeInInput(remValue)
  document.documentElement.style.setProperty('--root__font-size', `${remValue}rem`)
  const rootFontSize = getRootFontSize()
  insertRootFontSizeInElement(rootFontSize)
  insertHeadingSizeInElements()
}

/**
 * #### add predefined heading size ratio value
 * @param {any} event - event object
 * @returns undefined
 */
function predefinedScaleRatio (event) {
  const val = parseFloat(event.target.innerHTML)
  setHeadingSizeRatioValue(val)
  document.documentElement.style.setProperty('--heading-scale-ratio', `${val}`)
  insertHeadingSizeInElements()
}

/**
 * #### init function
 * @returns undefined
 */
function init () {
  const rootFontSize = getRootFontSize()
  const rootFontSizeCssVar = getRootFontSizeCssVar()
  insertRootFontSizeInInput(rootFontSizeCssVar)
  insertRootFontSizeInElement(rootFontSize)

  const headingRatio = getHeadingSizeRatio()
  setHeadingSizeRatioValue(headingRatio)
  insertHeadingSizeInElements()

  document.querySelector('[name="rootFontSize"]')?.addEventListener('input', updateRootFontSize, { passive: true })
  document.querySelector('[name="headingsSizeRatio"]')?.addEventListener('input', updateHeadingSizes, { passive: true })

  document.querySelectorAll('.page-text-size-btn').forEach((button) => {
    button.addEventListener('click', predefinedRootFontSize, { passive: true })
  })
  document.querySelectorAll('.headings-size-btn').forEach((button) => {
    button.addEventListener('click', predefinedScaleRatio, { passive: true })
  })

  window.addEventListener('resize', insertHeadingSizeInElements, { passive: true })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
