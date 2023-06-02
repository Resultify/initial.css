/* global getComputedStyle */
const pageTextSizeForm = document.getElementById('page-text-size')
const headingsRatioSection = document.getElementById('headings-ratio')
const fluidHeadingsSection = document.getElementById('fluid-headings')

/**
 * Get default browser text size or root css custom property text size
 * @returns {number} - default text size
 */
function getCssRootFontSize () {
  let rootFontSize = getComputedStyle(document.documentElement).getPropertyValue('--root__font-size')
  if (!isNaN(rootFontSize)) {
    rootFontSize = getComputedStyle(document.documentElement).getPropertyValue('font-size')
  }
  return parseFloat(rootFontSize.replace('px', ''))
}

/**
 * ## get headings size ration from css custom property
 * @param {Object} [element] - dom element
 * @returns {number} - headings size ratio
 */
function getCssHeadingRatio (element) {
  const headingsRatio = getComputedStyle(element).getPropertyValue('--heading-scale-ratio')
  return parseFloat(headingsRatio)
}

/**
 * ## Initialize headings ratio
 * @returns undefined
 */
function initSizeDefaults () {
  pageTextSizeForm.querySelector('[name="textSize"]').value = getCssRootFontSize()
  headingsRatioSection.querySelector('[name="headingsRatio"]').value = getCssHeadingRatio(headingsRatioSection)
  fluidHeadingsSection.querySelector('[name="headingsRatio"]').value = getCssHeadingRatio(fluidHeadingsSection)
}

/**
 * ## Set root text size
 * @param {Object} [event] - event object
 * @returns undefined
 */
function setRootTextSize (event) {
  document.documentElement.style.setProperty('--root__font-size', `${event.target.value}px`)
  renderHeadingsSize()
}

/**
 * ## Set headings size ratio
 * @param {Object} [event] - event object
 * @returns undefined
 */
function setHeadingRatio (event) {
  event.target.parentNode.parentNode.parentNode.style.setProperty('--heading-scale-ratio', event.target.value)
  renderHeadingsSize()
}

/**
 * ## Render all headings size
 * @returns undefined
 */
function renderHeadingsSize () {
  headingsRatioSection.querySelectorAll('[class^="text-"]').forEach((element) => {
    element.children[0].innerHTML = `${Math.floor(getComputedStyle(element).getPropertyValue('font-size').replace('px', ''))}px`
  })

  fluidHeadingsSection.querySelectorAll('[class^="text-"]').forEach((element) => {
    element.children[0].innerHTML = `${Math.floor(getComputedStyle(element).getPropertyValue('font-size').replace('px', ''))}px`
  })
}

pageTextSizeForm.querySelector('[name="textSize"]').addEventListener('input', setRootTextSize, { once: false, passive: false })
headingsRatioSection.querySelector('[name="headingsRatio"]').addEventListener('input', setHeadingRatio, { once: false, passive: false })
fluidHeadingsSection.querySelector('[name="headingsRatio"]').addEventListener('input', setHeadingRatio, { once: false, passive: false })

// recalcolate hedings size on resize window event
window.addEventListener('resize', renderHeadingsSize, { once: false, passive: true })

function init () {
  initSizeDefaults()
  renderHeadingsSize()
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init())
} else {
  init()
}
