import './style.scss'

const img = require('./assets/самурай без меча.jpg')
// import img from './assets/самурай без меча.jpg'

const image = document.createElement('img')

image.src = img
image.alt = 'samurai'

const button = document.querySelector('button')

// Вставляем
button?.parentNode?.insertBefore(image, button.nextSibling)