import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Animation from './Animation.js'

export default class AnimationVirus extends Animation {
  /**
   * @param {string} imageName 
   * @param {boolean} autoplay 
   */
  constructor(imageName, autoplay = true) {
    super()
    this.image = Assets.getImage(imageName)
    if (autoplay) this.play()
  }

  reset() {
    this.counter = 0
    this.elapsed = 0
    this.speed = 4.5
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  tick(renderer, delta, x, y) {
    if (this.playing) {
      this.elapsed += delta
  
      if (this.elapsed >= 1 / this.speed) {
        this.counter = (this.counter + 1) % 2
        this.elapsed = 0
      }
    }

    let sx = 0

    if (this.counter == 1) {
      sx = 8
    }

    renderer.getContext().drawImage(this.image, sx, 0, 8, 8, x, y, 8, 8)
  }
}
