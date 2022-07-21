const createElement = ({
  type = 'div',
  className,
  text,
  html,
  children,
}) => {
  const element = document.createElement(type)

  if (className) {
    element.classList.add(className)
  }

  if (text) {
    element.innerText = text
  } else if (html) {
    element.innerHTML = html
  } else if (children) {
    children.forEach(childElement => element.appendChild(childElement))
  }

  return element
}

const inputElement = document.getElementById('input')
inputElement.addEventListener('input', ({target:{value}}) => update(value))

const onesUnits = Array.from(document.querySelectorAll('.binary-time-display-item__column--ones .binary-time-display-item__segment'))
const tensUnits = Array.from(document.querySelectorAll('.binary-time-display-item__column--tens .binary-time-display-item__segment'))

const ACTIVE_SEGMENT_CLASS_NAME = 'binary-time-display-item__segment--active'

/**
 * @param {number} value - from `0` to `59`
 */
function update(value) {
  const [tens, ones] = String(value).padStart(2, '0').split('')

  const onesBinary = parseInt(ones, 10).toString(2).padStart(4, '0').split('')
  const tensBinary = parseInt(tens, 10).toString(2).padStart(3, '0').split('')

  updateUnits(onesUnits, onesBinary)
  updateUnits(tensUnits, tensBinary)
}

function updateUnits(unitElements, binaryArray) {
  unitElements.forEach((unitElement, index) => p(unitElement, index, binaryArray))
}

function p(unitElement, index, binaryArray) {
  let binaryDigit = parseInt(binaryArray[index], 10)

  unitElement.classList.toggle(ACTIVE_SEGMENT_CLASS_NAME, Boolean(binaryDigit))
}

function getCurrentDateTimeSeconds() {
  return new Date().getSeconds()
}

function tick() {
  if (document.activeElement !== inputElement) {
    inputElement.value = getCurrentDateTimeSeconds()
    inputElement.dispatchEvent(new Event('input'))
  }
  next()
}

function next() {
  window.requestAnimationFrame(() => tick())
}

next()


// Size
const displayElement = document.querySelector('.binary-time-display-item')
const displaySizeControl = document.getElementById('size')
displaySizeControl.value = displayElement.style.getPropertyValue('--segment-size')
displaySizeControl.addEventListener('input', ({target: {value}}) => {
  displayElement.style.setProperty('--segment-size', `${value}px`)
})

// Show Digit
const digitControl = document.getElementById('digit')
digitControl.addEventListener('change', ({target: {checked}}) => {
  displayElement.classList.toggle('binary-time-display-item--no-digit', !checked)
})
