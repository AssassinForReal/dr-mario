import Display from '../engine/Display.js'
import Keyboard from '../engine/Keyboard.js'
import Renderer from '../engine/Renderer.js'
import Debug from '../app/Debug.js'
import Screen from './screen/Screen.js'
import ScreenMainMenu from './screen/ScreenMainMenu.js'

export default class Game {
  /**
   * @type {Screen}
   */
  currentScreen = null

  /**
   * @param {Display} display 
   * @param {Renderer} renderer 
   * @param {Keyboard} keyboard 
   */
  constructor(display, renderer, keyboard) {
    this.display = display
    this.renderer = renderer
    this.keyboard = keyboard
    this.lastFrameTime = 0
    this.lastFramesClearTime = 0
    this.frames = 0
    this.currentTrack = null
  }

  start() {
    Debug.info('Starting game...')
    this.loopWrapper()
    this.setCurrentScreen(new ScreenMainMenu(this))
  }

  /**
   * @param {Screen} screen 
   */
  setCurrentScreen(screen) {
    if (this.currentScreen) {
      this.currentScreen.destroy()
    }
    this.currentScreen = screen
    this.currentScreen.create()
  }

  /**
   * @param {number} timestamp 
   */
  loopWrapper = (timestamp = undefined) => {
    const time = Date.now()
    const delta = (time - this.lastFrameTime) / 1000
    this.lastFrameTime = time

    if (timestamp !== undefined) {
      this.loop(delta)
      this.frames++
    }

    if (time - this.lastFramesClearTime >= 1000) {
      Debug.log(`${this.frames} fps`)
      this.frames = 0
      this.lastFramesClearTime = time
    }

    requestAnimationFrame(this.loopWrapper)
  }

  /**
   * @param {number} delta 
   */
  loop(delta) {
    this.renderer.clear()

    if (this.currentScreen) {
      this.keyboard.update()
      this.currentScreen.render(delta)
    }
  }

  /**
   * @param {string} trackName 
   */
  playTrack(trackName) {
    const trackSource = `assets/sounds/tracks/${trackName}.mp3`

    if (!this.currentTrack) {
      const track = new Audio(trackSource)
      track.loop = true
      this.currentTrack = track

      let warnLogged = false

      const tryingInterval = setInterval(async () => {
        try {
          await track.play()
          clearInterval(tryingInterval)

          Debug.info(`Playing track ${trackName}`)
        } catch (err) {
          if (warnLogged) return

          Debug.warn(`Cannot play track: ${trackName}. Reason: ${err}`)
          Debug.info(`Retrying to play ${trackName}...`)

          warnLogged = true
        }
      }, 250)

      return
    }

    this.currentTrack.src = trackSource
    this.currentTrack.load()
    this.currentTrack.play()
    Debug.info(`Playing track ${trackName}`)
  }

  pauseTrack() {
    if (this.currentTrack) {
      this.currentTrack.pause()

      const trackName = this.currentTrack.src.split('/').pop().split('.')[0]
      Debug.info(`Paused track ${trackName}`)
    }
  }
}
