import Application from './app/Application.js'
import BrowserEngine from './app/BrowserEngine.js'
import Debug from './app/Debug.js'

(() => {
  const appDialog = document.getElementById('app-dialog')

  const displayClickPrompt = true
  const debug = true

  function init() {
    appDialog.style.display = 'block'
    appDialog.textContent = 'Click anywhere to start'
  }

  function main() {
    Debug.info('Starting application...')

    BrowserEngine.init()

    const app = new Application()

    if (debug) {
      Object.defineProperty(
        window,
        'app',
        {
          value: app,
          writable: false
        }
      )
    }

    app.start()
  }

  if (displayClickPrompt) {
    init()

    addEventListener('click', () => {
      appDialog.style.display = 'none'
      main()
    }, { once: true })
  } else {
    main()
  }

})()
