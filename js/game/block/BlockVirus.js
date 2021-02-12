import Renderer from '../../engine/Renderer.js'
import AnimationVirus from '../animation/AnimationVirus.js'
import Block from './Block.js'

export default class BlockVirus extends Block {
  /**
   * @param {number} x 
   * @param {number} y 
   * @param {string} color 
   */
  constructor(x, y, color) {
    super(x, y, color)
    this.animation = new AnimationVirus(`virus-${color}.png`)
    this.isX = false
  }

  /**
   * @param {Renderer} renderer 
   * @param {number} delta 
   * @param {number} x 
   * @param {number} y 
   */
  render(renderer, delta, x, y) {
    if (this.isX) {
      renderer.getContext().drawImage(this.animation.image, 0, 8, 8, 8, x + this.x * 8, y + this.y * 8, 8, 8)
    } else {
      this.animation.render(renderer, delta, x + this.x * 8, y + this.y * 8)
    }
  }

  makeX() {
    this.isX = true
  }
}
