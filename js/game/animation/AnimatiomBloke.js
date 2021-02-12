import Animation from './Animation.js'
import Renderer from '../../engine/Renderer.js'
import Assets from '../../util/Assets.js'
import Numbers from '../../util/Numbers.js'

export default class AnimationBloke extends Animation {
  /**
   * @param {string} imageName 
   */
  constructor(imageName = null) {
    super()
    if (!imageName) imageName = 'bloke.png'
    this.image = Assets.getImage(imageName)
    this.visible = true
    this.around = false
    this.type = AnimationBloke.TYPE_DEFAULT
    this.radius = 0
    this.cycleSpeed = 0
    this.startAngle = 0
  }

  static TYPE_DEFAULT = 0
  static TYPE_DANCE = 1
  static TYPE_LAUGH = 2
  static TYPE_DIE = 3

  reset() {
    this.counter = 0
    this.elapsed = 0
    this.speed = 3.75
    this.cycleCounter = this.startAngle
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
        this.counter = (this.counter + 1) % 4
        this.elapsed = 0
      }
    }

    let radians = Numbers.toRadians(Math.round(this.cycleCounter / 24) * 24)
    x += Math.round(this.radius * Math.cos(radians))
    y += Math.round(this.radius * Math.sin(radians))

    if (this.around) {
      if (this.playing) {
        this.cycleCounter += this.cycleSpeed * delta
      }

      if (this.cycleCounter > 360) {
        this.cycleCounter -= 360
      }
    }

    if (this.visible) {
      if (this.type == AnimationBloke.TYPE_DANCE) {
        this.tickDance(renderer, delta, x, y)
      }

      else if (this.type == AnimationBloke.TYPE_LAUGH) {
        this.tickLaugh(renderer, delta, x, y)
      }

      else if (this.type == AnimationBloke.TYPE_DIE) {
        this.tickDie(renderer, delta, x, y)
      }
    }
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  tickDance(renderer, delta, x, y) {
    if (this.counter == 0 || this.counter == 2) {
      renderer.getContext().drawImage(this.image, 0, 0, 32, 24, x, y, 32, 24)
    }

    else if (this.counter == 1 || this.counter == 3) {
      renderer.renderFlippedImage({
        image: this.image,
        sx: 32, sy: 0,
        sWidth: 32, sHeight: 24,
        dx: x, dy: y,
        dWidth: 32, dHeight: 24,
        flipH: this.counter == 3
      })
    }
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  tickLaugh(renderer, delta, x, y) {
    if (this.counter == 0 || this.counter == 2) {
      renderer.getContext().drawImage(this.image, 0, 0, 32, 24, x, y, 32, 24)
    }

    else if (this.counter == 1 || this.counter == 3) {
      renderer.getContext().drawImage(this.image, 0, 24, 32, 24, x, y, 32, 24)
    }
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  tickDie(renderer, delta, x, y) {
    if (this.counter == 0 || this.counter == 2) {
      renderer.getContext().drawImage(this.image, 32, 24, 32, 24, x, y, 32, 24)
    }

    else if (this.counter == 1 || this.counter == 3) {
      renderer.renderFlippedImage({
        image: this.image,
        sx: 32, sy: 24,
        sWidth: 32, sHeight: 24,
        dx: x, dy: y,
        dWidth: 32, dHeight: 24,
        flipH: this.counter == 3
      })
    }
  }

  /**
  * @param {boolean} visible 
  */
  setVisible(visible) {
    this.visible = visible
  }

  doDance() {
    this.type = AnimationBloke.TYPE_DANCE
  }

  doLaugh() {
    this.type = AnimationBloke.TYPE_LAUGH
  }

  doDie() {
    this.type = AnimationBloke.TYPE_DIE
  }

  /**
   * @param {boolean} around 
   */
  setAround(around) {
    this.around = around
  }
}
