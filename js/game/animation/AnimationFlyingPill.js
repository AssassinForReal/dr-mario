import Animation from './Animation.js'
import Renderer from '../../engine/Renderer.js'
import EntityPill from '../entity/EntityPill.js'

export default class AnimationFlyingPill extends Animation {
  /**
   * @param {EntityPill} pill 
   */
  constructor(pill) {
    super()
    this.pill = pill
  }

  reset() {
    this.counter = 0
    this.elapsed = 0
    this.speed = 50
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
        this.counter++
        this.elapsed = 0
      }

      if (this.counter == 0) {
        this.pill.setPosition(10, 3)
        this.pill.setRotation(0)
      }

      else if (this.counter == 1) {
        this.pill.setRotation(1)
      }

      else if (this.counter == 2) {
        this.pill.setPosition(9, 2)
        this.pill.setRotation(0)
      }

      else if (this.counter == 3) {
        this.pill.setRotation(1)
      }

      else if (this.counter == 4) {
        this.pill.setPosition(8, 1)
        this.pill.setRotation(0)
      }

      else if (this.counter == 5) {
        this.pill.setRotation(1)
      }

      else if (this.counter == 6) {
        this.pill.setPosition(7, 1)
        this.pill.setRotation(2)
      }

      else if (this.counter == 7) {
        this.pill.setRotation(3)
      }

      else if (this.counter == 8) {
        this.pill.setPosition(6, 1)
        this.pill.setRotation(0)
      }

      else if (this.counter == 9) {
        this.pill.setRotation(1)
      }

      else if (this.counter == 10) {
        this.pill.setPosition(5, 1)
        this.pill.setRotation(2)
      }

      else if (this.counter == 11) {
        this.pill.setRotation(3)
      }

      else if (this.counter == 12) {
        this.pill.setPosition(4, 1)
        this.pill.setRotation(0)
      }

      else if (this.counter == 13) {
        this.pill.setRotation(1)
      }

      else if (this.counter == 14) {
        this.pill.setPosition(3, 1)
        this.pill.setRotation(2)
      }

      else if (this.counter == 15) {
        this.pill.setRotation(3)
      }

      else if (this.counter == 16) {
        this.pill.setPosition(2, 1)
        this.pill.setRotation(0)
      }

      else if (this.counter == 17) {
        this.pill.setRotation(1)
      }

      else if (this.counter == 18) {
        this.pill.setPosition(1, 2)
        this.pill.setRotation(2)
      }

      else if (this.counter == 19) {
        this.pill.setRotation(3)
      }

      else if (this.counter == 20) {
        this.pill.setPosition(0, 2)
        this.pill.setRotation(0)
      }

      else if (this.counter == 21) {
        this.pill.setPosition(0, 3)
      }

      else if (this.counter == 22) {
        this.pill.setPosition(0, 4)
      }

      else if (this.counter == 23) {
        this.pill.setPosition(0, 5)
      }

      else if (this.counter == 24) {
        this.pill.setPosition(0, 6)
      }
    }

    this.pill.render(renderer, x, y)
  }
}
