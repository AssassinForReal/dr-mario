import Renderer from '../../engine/Renderer.js'

export default class Animation {
  constructor() {
    this.playing = false
  }

  play() {
    this.playing = true
    this.reset()
  }

  stop() {
    this.playing = false
  }

  pause() {
    this.playing = false
  }

  resume() {
    this.playing = true
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  render(renderer, delta, x, y) {
    this.tick(renderer, delta, x, y)
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  tick(renderer, delta, x, y) { }

  reset() { }

  isPlaying() {
    return this.playing
  }
}
